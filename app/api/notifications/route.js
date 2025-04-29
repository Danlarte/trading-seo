import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Notification from "@/models/Notification";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

// GET /api/notifications
export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    // Obtener el _id del usuario
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const read = searchParams.get("read");
    const category = searchParams.get("category");

    const query = { userId: user._id };

    if (read !== null) {
      query.read = read === "true";
    }

    if (category) {
      query.category = category;
    }

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .sort({ priority: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Notification.countDocuments(query),
    ]);

    const unreadCount = await Notification.countDocuments({
      userId: user._id,
      read: false,
    });

    return NextResponse.json({
      notifications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
      unreadCount,
    });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener notificaciones" },
      { status: 500 }
    );
  }
}

// POST /api/notifications
export async function POST(req) {
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
        { error: "No tienes permisos para crear notificaciones" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      userIds,
      title,
      message,
      type,
      link,
      category,
      priority,
      expiresAt,
      metadata,
    } = body;

    if (!userIds || !Array.isArray(userIds) || !title || !message) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const notifications = await Notification.insertMany(
      userIds.map((userId) => ({
        userId,
        title,
        message,
        type,
        link,
        category,
        priority,
        expiresAt,
        metadata,
        createdBy: user._id,
      }))
    );

    return NextResponse.json({ notifications }, { status: 201 });
  } catch (error) {
    console.error("Error al crear notificaciones:", error);
    return NextResponse.json(
      { error: "Error al crear notificaciones" },
      { status: 500 }
    );
  }
}
