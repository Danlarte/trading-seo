const SibApiV3Sdk = require("@getbrevo/brevo");
import { NextResponse } from "next/server";
export async function POST(request) {
  let apiInstance = new SibApiV3Sdk.ContactsApi();

  apiInstance.setApiKey(
    SibApiV3Sdk.AccountApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  const json = await request.json();
  const { nombre, apellidos, sms, email } = json;

  if (!email) {
    return NextResponse.json(
      {
        response: "Email is required",
        estado: "error",
      },
      { status: 400 }
    );
  }

  let { lista } = json;
  if (!lista) {
    lista = 13;
  }
  let error = false;
  let createContact = new SibApiV3Sdk.CreateContact();
  const contactInfo = await apiInstance
    .getContactInfo(email)
    .catch((err) => (error = true));

  if (error) {
    createContact.email = email;
    createContact.attributes = {
      NOMBRE: nombre || "",
      APELLIDOS: apellidos || "",
      ...(sms && { SMS: sms }),
    };

    createContact.listIds = [lista];
    try {
      console.log("Creating contact with data:", createContact);
      const res = await apiInstance.createContact(createContact);
      return NextResponse.json({
        response: res.body,
        estado: "ok",
      });
    } catch (err) {
      console.error("Error creating contact:", err.response?.body || err);
      return NextResponse.json(
        {
          response:
            err.response?.body || err.message || "Error creating contact",
          estado: "error",
        },
        { status: 400 }
      );
    }
  } else {
    let updateContact = new SibApiV3Sdk.UpdateContact();

    updateContact.attributes = {
      NOMBRE: nombre || "",
      APELLIDOS: apellidos || "",
      ...(sms && { SMS: sms }),
    };
    updateContact.listIds = [lista];

    try {
      console.log("Updating contact with data:", updateContact);
      const res = await apiInstance.updateContact(email, updateContact);
      return NextResponse.json({
        response: res.body,
        estado: "ok",
      });
    } catch (err) {
      console.error("Error updating contact:", err.response?.body || err);

      // Si el error es por duplicado de SMS, solo añadimos a la lista
      if (err.response?.body?.code === "duplicate_parameter") {
        try {
          let updateContact = new SibApiV3Sdk.UpdateContact();
          updateContact.listIds = [lista];
          const res = await apiInstance.updateContact(email, updateContact);
          return NextResponse.json({
            response: "Contact added to list",
            estado: "ok",
          });
        } catch (addErr) {
          return NextResponse.json(
            {
              response: addErr.message || "Error adding to list",
              estado: "error",
            },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        {
          response:
            err.response?.body || err.message || "Error updating contact",
          estado: "error",
        },
        { status: 400 }
      );
    }
  }
}
export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");
  let apiInstance = new SibApiV3Sdk.ContactsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.AccountApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = [13];

  try {
    const contactInfo = await apiInstance.getContactInfo(email);

    // El contacto ya existe, lo añadimos a la lista
    let contactEmails = new SibApiV3Sdk.AddContactToList();
    contactEmails.emails = [email];
    let listId = 12;

    const res = await apiInstance.addContactToList(listId, contactEmails);

    return NextResponse.json({
      response: res.response.body,
      estado: res.response.statusCode === 201 ? "ok" : "error",
    });
  } catch (error) {
    // El contacto no existe, lo creamos
    const res = await apiInstance.createContact(createContact);

    return NextResponse.json({
      response: res.response.body,
      estado: res.response.statusCode === 201 ? "ok" : "error",
    });
  }
}
