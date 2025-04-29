import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export async function GET() {
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

    // Obtener usuarios que tienen al menos una compra
    const users = await User.find(
      {
        compras: { $exists: true, $ne: [] },
      },
      {
        password: 0, // Excluir contraseña
        __v: 0,
      }
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios con compras:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios con compras" },
      { status: 500 }
    );
  }
}
