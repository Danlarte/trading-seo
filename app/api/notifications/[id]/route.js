import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Notification from "@/models/Notification";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

// GET /api/notifications/[id]
export async function GET(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const notification = await Notification.findOne({
      _id: params.id,
      userId: user._id,
    }).lean();

    if (!notification) {
      return NextResponse.json(
        { error: "Notificación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notification });
  } catch (error) {
    console.error("Error al obtener notificación:", error);
    return NextResponse.json(
      { error: "Error al obtener notificación" },
      { status: 500 }
    );
  }
}

// PATCH /api/notifications/[id]
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { read } = body;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: params.id,
        userId: user._id,
      },
      { read },
      { new: true }
    ).lean();

    if (!notification) {
      return NextResponse.json(
        { error: "Notificación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notification });
  } catch (error) {
    console.error("Error al actualizar notificación:", error);
    return NextResponse.json(
      { error: "Error al actualizar notificación" },
      { status: 500 }
    );
  }
}

// DELETE /api/notifications/[id]
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const notification = await Notification.findOneAndDelete({
      _id: params.id,
      userId: user._id,
    }).lean();

    if (!notification) {
      return NextResponse.json(
        { error: "Notificación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    return NextResponse.json(
      { error: "Error al eliminar notificación" },
      { status: 500 }
    );
  }
}
