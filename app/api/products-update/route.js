import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  const body = await request.json();
  const evento = body.event;
  if (evento === "entry.publish") {
    const modelo = body.model;
    if (modelo === "producto") {
      if (body.entry.stripePriceID) {
        return NextResponse.json(body);
      }
      const id = body.entry.id;
      const titulo = body.entry.titulo;
      const precio = parseInt(body.entry.precio);
      const getPrecio = await stripe.products
        .search({
          query: `active:'true' AND name:'${titulo}'`,
        })
        .catch((e) => console.log(e));

      if (getPrecio.data.length > 0) {
        const productBody = JSON.stringify({
          data: {
            stripeProductID: getPrecio.data[0].id,
            stripePriceID: getPrecio.data[0].default_price,
          },
        });
        const productoStrapi = await fetch(
          `https://tradingapi.jose-sanchez.dev/api/productos/${id}`,
          {
            method: "PUT",
            body: productBody,
            headers: headersList,
          }
        )
          .then((e) => e.json())
          .catch((e) => console.log(e));
      } else {
        let price;
        if (body.entry.tipo === "membresia") {
          price = await stripe.products
            .create({
              name: titulo,
              default_price_data: {
                currency: "eur",
                unit_amount: precio,
                recurring: {
                  interval: "month",
                },
              },
            })
            .catch((e) => console.log(e));
        } else {
          price = await stripe.products
            .create({
              name: titulo,
              default_price_data: {
                currency: "eur",
                unit_amount: precio,
              },
            })
            .catch((e) => console.log(e));
        }

        const productBody = JSON.stringify({
          data: {
            stripeProductID: price.id,
            stripePriceID: price.default_price,
          },
        });
        const productoStrapi = await fetch(
          `https://tradingapi.jose-sanchez.dev/api/productos/${id}`,
          {
            method: "PUT",
            body: productBody,
            headers: headersList,
          }
        )
          .then((e) => e.json())
          .catch((e) => console.log(e));
      }
    }
  } else if (evento === "entry.delete") {
    const stripeID = body.entry.stripeProductID;
    const product = await stripe.products
      .update(stripeID, {
        active: false,
      })
      .catch((e) => console.log(e));
  } else if (evento === "entry.update") {
    const modelo = body.model;
    if (modelo === "producto") {
      let priceIn;
      const id = body.entry.id;
      const titulo = body.entry.titulo;
      const precio = parseInt(body.entry.precio);
      const stripeProductID = body.entry.stripeProductID;
      const stripePrice = body.entry.stripePriceID;
      const price = await stripe.prices.retrieve(stripePrice);
      if (price.unit_amount != precio) {
        if (body.entry.tipo !== "membresia") {
          priceIn = await stripe.prices
            .create({
              product: stripeProductID,
              currency: "eur",
              unit_amount: precio,
            })
            .catch((e) => console.log(e));
        } else {
          priceIn = await stripe.prices
            .create({
              product: stripeProductID,
              currency: "eur",
              unit_amount: precio,
              recurring: {
                interval: "month",
              },
            })
            .catch((e) => console.log(e));
        }

        const productBody = JSON.stringify({
          data: {
            stripePriceID: priceIn.id,
          },
        });
        const productoStrapi = await fetch(
          `https://tradingapi.jose-sanchez.dev/api/productos/${id}`,
          {
            method: "PUT",
            body: productBody,
            headers: headersList,
          }
        )
          .then((e) => e.json())
          .catch((e) => console.log(e));
      }
    }
  }

  return NextResponse.json(body);
}
