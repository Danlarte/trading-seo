import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Notification from "@/models/Notification";

// POST /api/notifications/mark-all-read
export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const result = await Notification.updateMany(
      {
        userId: session.user.id,
        read: false,
      },
      {
        read: true,
      }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error al marcar notificaciones como leídas:", error);
    return NextResponse.json(
      { error: "Error al marcar notificaciones como leídas" },
      { status: 500 }
    );
  }
}
