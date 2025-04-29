import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: 7,
      duration: "once",
    });

    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: `TRADINGPRO${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`,
      max_redemptions: 1,
    });

    return NextResponse.json({ code: promotionCode.code }, { status: 200 });
  } catch (error) {
    console.error("Error al generar el código de descuento:", error);
    return NextResponse.json(
      { error: "Error al generar el código de descuento" },
      { status: 500 }
    );
  }
}
