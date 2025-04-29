import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

// Función para crear consultas GraphQL con variables
function createQuery(queryString) {
  return (variables) =>
    gql`
      ${queryString(variables)}
    `;
}

// Objeto con las consultas GraphQL
const queries = {
  getAcciones: createQuery(
    () => `
    query acciones {
      acciones {
        data {
          id
          attributes {
            nombre
            ticker
            precio
            potencial
            descripcion
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  `
  ),
};

// Función para ejecutar consultas
async function executeQuery(queryFunction, variables = {}) {
  try {
    const { data } = await client.query({
      query: queryFunction(variables),
    });
    return data;
  } catch (error) {
    console.error("Error en la consulta GraphQL:", error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const data = await executeQuery(queries.getAcciones);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en el endpoint de acciones:", error);
    return NextResponse.json(
      { error: "Error al obtener las acciones" },
      { status: 500 }
    );
  }
}
