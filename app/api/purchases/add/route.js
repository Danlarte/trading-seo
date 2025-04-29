import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";
import axios from "axios";

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    // Verificar si el usuario es admin
    const adminUser = await User.findOne({ email: session.user.email }).lean();
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { userIds, stripePriceId, isSubscriptionPlan } = body;

    if (!userIds || !Array.isArray(userIds) || !stripePriceId) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Actualizar usuarios en MongoDB
    const updateResult = await User.updateMany(
      { _id: { $in: userIds } },
      {
        $addToSet: { compras: stripePriceId },
        $set: { hasAccess: true },
      }
    );

    // Si es un plan de suscripción, actualizar el campo "plan" en Strapi
    if (isSubscriptionPlan) {
      try {
        // Obtener los usuarios actualizados para obtener sus emails
        const updatedUsers = await User.find(
          { _id: { $in: userIds } },
          { email: 1 }
        ).lean();

        // Para cada usuario, actualizar su plan en Strapi
        const strapiUpdates = updatedUsers.map(async (user) => {
          try {
            // Buscar el usuario en Strapi por email
            const strapiResponse = await axios.get(
              `https://tradingapi.jose-sanchez.dev/api/users?filters[email][$eq]=${user.email}`
            );

            const strapiUsers = strapiResponse.data;
            if (strapiUsers && strapiUsers.length > 0) {
              const strapiUserId = strapiUsers[0].id;

              // Actualizar el campo plan a EXPERT
              await axios.put(
                `https://tradingapi.jose-sanchez.dev/api/users/${strapiUserId}`,
                {
                  plan: "EXPERT",
                }
              );
            }
          } catch (strapiError) {
            console.error(
              `Error actualizando usuario ${user.email} en Strapi:`,
              strapiError.response
            );
          }
        });

        // Esperar a que todas las actualizaciones se completen
        await Promise.allSettled(strapiUpdates);
      } catch (strapiError) {
        console.error("Error actualizando usuarios en Strapi:", strapiError);
      }
    }

    return NextResponse.json({
      success: true,
      modifiedCount: updateResult.modifiedCount,
      planUpdated: isSubscriptionPlan,
    });
  } catch (error) {
    console.error("Error al agregar compras:", error);
    return NextResponse.json(
      { error: "Error al agregar compras" },
      { status: 500 }
    );
  }
}
