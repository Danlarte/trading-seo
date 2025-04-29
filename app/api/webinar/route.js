import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_WEBINAR = gql`
  query GetWebinar {
    webinar {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const { data } = await client.query({
      query: GET_WEBINAR,
    });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching webinar:", error);
    return NextResponse.json(
      { error: "Error al obtener el webinar" },
      { status: 500 }
    );
  }
}
