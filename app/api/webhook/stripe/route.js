import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import config from "@/config";
import User from "@/models/User";
import { findCheckoutSession } from "@/libs/stripe";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Configuración del cliente Apollo

// This is where we receive Stripe webhook events
// It used to update the user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://shipfa.st/docs/features/payments
export async function POST(req) {
  await connectMongo();

  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product

        const session = await findCheckoutSession(data.object.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = data.object.client_reference_id;
        const plan = config.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) {
          const customer = await stripe.customers.retrieve(customerId);
          let user;

          // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
          if (userId) {
            user = await User.findById(userId);
          } else if (customer.email) {
            user = await User.findOne({ email: customer.email });

            if (!user) {
              user = await User.create({
                email: customer.email,
                name: customer.name,
              });

              await user.save();
            }
          } else {
            console.error("No user found");
            throw new Error("No user found");
          }
          user.teste = "teste333";
          user.compras.push(priceId);
          user.hasAccess = true;
          await user.save();
        } else {
          const customer = await stripe.customers.retrieve(customerId);

          let user;

          // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
          if (userId) {
            user = await User.findById(userId);
          } else if (customer.email) {
            user = await User.findOne({ email: customer.email });

            if (!user) {
              user = await User.create({
                email: customer.email,
                name: customer.name,
              });

              await user.save();
            }
          } else {
            console.error("No user found");
            throw new Error("No user found");
          }

          // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
          if (!user.compras || !Array.isArray(user.compras)) {
            user.compras = [priceId];
          } else if (!user.compras.includes(priceId)) {
            user.compras.push(priceId);
          }
          user.priceId = priceId;
          user.customerId = customerId;
          user.hasAccess = true;
          await user.save();
          const userStrapi = await fetch(
            `${process.env.NEXTAUTH_URL}/api/usuarios`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: customer.email }),
            }
          )
            .then((res) => res.json())
            .catch((err) =>
              console.error(
                "Error al obtener el usuario en Strapi: desde el Webhook",
                err
              )
            );

          // Actualizar el usuario en Strapi
          try {
            const UPDATE_USER = gql`
              mutation UpdateUser(
                $id: ID!
                $plan: String!
                $stripeID: String!
              ) {
                updateUsersPermissionsUser(
                  id: $id
                  data: { plan: $plan, externalid: $stripeID }
                ) {
                  data {
                    id
                    attributes {
                      email
                      plan
                      externalid
                    }
                  }
                }
              }
            `;

            await client.mutate({
              mutation: UPDATE_USER,
              variables: {
                id: parseInt(userStrapi.id),
                plan: "EXPERT",
                stripeID: customerId,
              },
            });
          } catch (error) {
            console.error("Error al actualizar el usuario en Strapi:", error);
          }
        }
        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        break;
      }

      case "customer.subscription.deleted": {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );

        const user = await User.findOne({ customerId: subscription.customer });

        const userStrapi = await fetch(
          `${process.env.NEXTAUTH_URL}/api/usuarios`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          }
        )
          .then((res) => res.json())
          .catch((err) =>
            console.error(
              "Error al obtener el usuario en Strapi: desde el Webhook",
              err
            )
          );
        try {
          const UPDATE_USER = gql`
            mutation UpdateUser($id: ID!, $plan: String!) {
              updateUsersPermissionsUser(id: $id, data: { plan: $plan }) {
                data {
                  id
                  attributes {
                    email
                    plan
                    externalid
                    plan
                  }
                }
              }
            }
          `;

          await client.mutate({
            mutation: UPDATE_USER,
            variables: {
              id: parseInt(userStrapi.id),
              plan: "",
            },
          });
        } catch (error) {
          console.error("Error al actualizar el usuario en Strapi:", error);
        }

        // Revoke access to your product
        user.hasAccess = false;
        await user.save();

        break;
      }

      case "invoice.paid": {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product
        const priceId = data.object.lines.data[0].price.id;
        const customerId = data.object.customer;

        const user = await User.findOne({ customerId });

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (user.priceId !== priceId) break;

        // Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "invoice.payment_failed":
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
