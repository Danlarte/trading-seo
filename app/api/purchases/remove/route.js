import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";
import axios from "axios";
import config from "@/config";

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
    const { userId, stripePriceId } = body;

    if (!userId || !stripePriceId) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Obtener el usuario antes de la actualización
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si es un plan de suscripción
    const isSubscriptionPlan = config.stripe.plans.some(
      (plan) => plan.priceId === stripePriceId
    );

    // Eliminar la compra del array de compras
    const updateResult = await User.updateOne(
      { _id: userId },
      { $pull: { compras: stripePriceId } }
    );

    // Si el usuario no tiene más compras después de esta eliminación, desactivar el acceso
    const updatedUser = await User.findById(userId).lean();
    if (!updatedUser.compras || updatedUser.compras.length === 0) {
      await User.updateOne({ _id: userId }, { $set: { hasAccess: false } });
    }

    // Si era un plan de suscripción, actualizar el campo plan en Strapi
    if (isSubscriptionPlan) {
      try {
        // Verificar si hay otros planes de suscripción en las compras restantes
        const hasOtherSubscription = updatedUser.compras?.some((priceId) =>
          config.stripe.plans.some((plan) => plan.priceId === priceId)
        );

        if (!hasOtherSubscription) {
          // Si no hay otras suscripciones, actualizar plan a FREE en Strapi
          const strapiResponse = await axios.get(
            `https://tradingapi.jose-sanchez.dev/api/users?filters[email][$eq]=${user.email}`
          );

          const strapiUsers = strapiResponse.data;
          if (strapiUsers && strapiUsers.length > 0) {
            const strapiUserId = strapiUsers[0].id;

            await axios.put(
              `https://tradingapi.jose-sanchez.dev/api/users/${strapiUserId}`,
              {
                plan: "FREE",
              }
            );
          }
        }
      } catch (strapiError) {
        console.error(
          `Error actualizando usuario ${user.email} en Strapi:`,
          strapiError.response
        );
      }
    }

    return NextResponse.json({
      success: true,
      modifiedCount: updateResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    return NextResponse.json(
      { error: "Error al eliminar compra" },
      { status: 500 }
    );
  }
}
