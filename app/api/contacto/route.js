import { NextResponse } from "next/server";
import { sendEmail } from "@/libs/resend";

export async function POST(req) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, email, mensaje } = await req.json();

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Preparar el contenido del correo electrónico
    const subject = "Nuevo mensaje de contacto de TradingPRO";
    const text = `
      Nombre: ${nombre}
      Email: ${email}
      Mensaje: ${mensaje}
    `;
    const html = `
      <h1>Nuevo mensaje de contacto de TradingPRO</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
    `;

    // Enviar el correo electrónico
    await sendEmail({
      to: process.env.EMAIL_CONTACTO, // Asegúrate de que esta sea la dirección correcta
      subject,
      text,
      html,
      replyTo: email,
    });

    // Responder con éxito
    return NextResponse.json(
      { message: "Mensaje enviado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el email:", error);

    // Responder con error
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
