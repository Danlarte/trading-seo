"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Encabezado from "../home/Encabezado";
import Markdown from "markdown-to-jsx";
import ReactAudioPlayer from "react-audio-player";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaMicrophone,
  FaFacebook,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import ButtonSignin from "../ButtonSignin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

async function getPostData(slug) {
  const response = await fetch(`/api/entradas?accion=getBySlug&slug=${slug}`);

  const data = await response.json();

  return data.data[0];
}

async function getRelatedPosts(slug, categoria) {
  const response = await fetch(
    `/api/entradas?accion=getRelatedBySlug&slug=${slug}&categoria=${categoria}`
  );
  const data = await response.json();
  return data.data;
}

const ShareButton = ({ href, icon: Icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`mx-1 p-2 rounded-full text-white bg-[#17498A] hover:opacity-80`}
  >
    <Icon size={16} />
  </a>
);

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#54BCAF"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-[#54BCAF]">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default function SingleNoticias({ initialData, slug }) {
  const { data: session } = useSession();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await axios.get(
        `/api/entradas?accion=getBySlug&slug=${slug}`
      );
      return response.data.data[0];
    },
    initialData,
    refetchInterval: 3000,
    staleTime: 2500,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["relatedPosts", slug],
    queryFn: async () => {
      const response = await axios.get(
        `/api/entradas?accion=getRelatedBySlug&slug=${slug}&categoria=${post?.attributes?.category?.data?.attributes?.slug}`
      );
      return response.data.data;
    },
    enabled: !!post?.attributes?.category?.data?.attributes?.slug,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el post</div>;

  if (!post || !post.attributes) {
    return <div>Error: No se pudo cargar el post</div>;
  }

  const { attributes } = post;

  const enlaceImagen =
    attributes.imagenPrincipal.data.attributes.url.startsWith("https")
      ? attributes.imagenPrincipal.data.attributes.url
      : `https://tradingapi.jose-sanchez.dev${attributes.imagenPrincipal.data.attributes.url}`;

  const shareUrl = `${process.env.NEXTAUTH_URL}/noticias/${attributes.category.data.attributes.slug}/${attributes.slug}`;
  const shareTitle = attributes.titulo;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle} ${shareUrl}`
    )}`,
  };

  return (
    <>
      <ReadingProgress />
      <Encabezado titulo={attributes.category.data.attributes.titulo} />
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className={`relative w-full h-[300px] lg:h-[500px] ${attributes.slug}`}
          >
            <Image
              alt="imagen principal"
              fill
              quality={100}
              style={{
                objectFit: "cover",
              }}
              src={enlaceImagen}
            />
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-3/4 p-6 lg:p-8">
              <span className="text-sm font-bold text-[#17498A] mb-2">
                {attributes.autor}
              </span>
              <h1
                style={{
                  viewTransitionName: attributes.slug + "Titulotransition",
                }}
                className={`text-2xl lg:text-4xl font-bold text-[#17498A] mb-4 ${attributes.slug}titulo`}
              >
                {attributes.titulo}
              </h1>

              {attributes.audio.data && (
                <div className="mb-6 p-4 bg-[#54bcaf] rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-white w-12 h-12 flex justify-center items-center rounded-full mr-4">
                      <FaMicrophone color="#54bcaf" size={24} />
                    </div>
                    <span className="text-white font-bold">Escuchar audio</span>
                  </div>
                  <ReactAudioPlayer
                    src={attributes.audio.data.attributes.url}
                    controls
                    controlsList="nodownload"
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex justify-start items-center mb-6">
                <span className="mr-2 text-sm font-bold">Compartir:</span>

                <ShareButton
                  href={shareLinks.twitter}
                  icon={FaXTwitter}
                  color="blue-400"
                />
                <ShareButton
                  href={shareLinks.facebook}
                  icon={FaFacebook}
                  color="blue-600"
                />
                <ShareButton
                  href={shareLinks.telegram}
                  icon={FaTelegram}
                  color="blue-500"
                />
                <ShareButton
                  href={shareLinks.whatsapp}
                  icon={FaWhatsapp}
                  color="green-500"
                />
              </div>

              <div
                style={{
                  viewTransitionName: attributes.slug + "parrafotransition",
                }}
                className={`text-gray-700 text-lg leading-relaxed ${attributes.slug}parrafo`}
              >
                <Markdown
                  options={{
                    overrides: {
                      p: {
                        props: {
                          className: "mb-4",
                        },
                      },
                      a: {
                        props: {
                          className: "text-[#54BCAF] hover:text-[#17498A]",
                        },
                      },
                    },
                  }}
                >
                  {attributes.contenido}
                </Markdown>
              </div>

              {attributes.videoLegacy && (
                <div className="mt-8 w-full">
                  <div
                    className="w-full rounded-xl overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: attributes.videoLegacy }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col w-full lg:w-1/4 p-6 lg:p-8">
              {!session && (
                <div className="bg-[#54BCAF] bg-opacity-10 p-6 rounded-xl shadow-md mb-8">
                  <h3 className="text-xl font-bold text-[#17498A] mb-4">
                    ¡Regístrate ahora!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Obtén acceso a contenido exclusivo y mantente actualizado
                    con las últimas noticias.
                  </p>
                  <ButtonSignin
                    text="Acceso usuarios"
                    extraStyle="bg-[#17498A] hover:bg-[#54BCAF] text-white uppercase font-bold flex justify-center items-center py-3 px-6 rounded-full transition-colors duration-300"
                  />
                </div>
              )}

              <div className="hidden lg:block mt-8">
                <Link href="/landing">
                  <Image
                    alt="Banner vertical"
                    width={340}
                    height={233}
                    src="/banner vertical.png"
                    className="rounded-xl"
                  />
                </Link>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#17498A] mb-4">
                  Posts Relacionados
                </h3>
                <div className="space-y-4">
                  {relatedPosts?.map((post) => (
                    <Link
                      key={post.id}
                      href={`/noticias/${post.attributes.category.data.attributes.slug}/${post.attributes.slug}`}
                      className="block group"
                    >
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative w-full h-32">
                          <Image
                            src={
                              post.attributes.imagenPrincipal.data.attributes.url.startsWith(
                                "https"
                              )
                                ? post.attributes.imagenPrincipal.data
                                    .attributes.url
                                : `https://tradingapi.jose-sanchez.dev${post.attributes.imagenPrincipal.data.attributes.url}`
                            }
                            alt={post.attributes.titulo}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-semibold text-[#17498A] group-hover:text-[#54BCAF] line-clamp-2">
                            {post.attributes.titulo}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              post.attributes.fecha
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
