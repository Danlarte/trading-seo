import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { client } from "@/libs/apollo-client";

const GET_VIDEOS = gql`
  query GetVideos($categoria: String) {
    videos(filters: { categoria: { eq: $categoria } }) {
      data {
        id
        attributes {
          titulo
          url
          categoria
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
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria");

  try {
    const { data } = await client.query({
      query: GET_VIDEOS,
      variables: { categoria },
    });

    const response = NextResponse.json(data.videos.data);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    const errorResponse = NextResponse.json(
      { error: "Error al obtener los videos" },
      { status: 500 }
    );
    errorResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return errorResponse;
  }
}
