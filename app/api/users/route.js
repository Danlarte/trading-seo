import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    // Verificar si el usuario es admin
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: "No tienes permisos para ver esta información" },
        { status: 403 }
      );
    }

    // Obtener todos los usuarios, excluyendo información sensible
    const users = await User.find({})
      .select("name email createdAt hasAccess isAdmin")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
