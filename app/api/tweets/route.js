import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const query = gql`
  query tweets {
    twitters(sort: "publishedAt:desc", pagination: { pageSize: 15 }) {
      data {
        id
        attributes {
          contenido
          publishedAt
        }
      }
    }
  }
`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get("timestamp");
  try {
    const { data } = await client.query({
      query,
    });

    const tweets = data.twitters.data.map((tweet) => ({
      id: tweet.id,
      contenido: tweet.attributes.contenido,
      publishedAt: tweet.attributes.publishedAt,
    }));

    const response = NextResponse.json(tweets);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = NextResponse.json(
      { error: "Error al obtener los tweets" },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
