import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_RESEARCHS = gql`
  query GetResearchs {
    researchs(pagination: { pageSize: 1000 }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          titulo
          createdAt
          archivo {
            data {
              attributes {
                url
                name
              }
            }
          }
          imagen {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET(request) {
  try {
    const { data } = await client.query({
      query: GET_RESEARCHS,
    });

    const response = NextResponse.json(data.researchs.data);
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error) {
    console.error("Error al obtener los researchs:", error);
    return NextResponse.json(
      { error: "Error al obtener los researchs" },
      { status: 500 }
    );
  }
}
