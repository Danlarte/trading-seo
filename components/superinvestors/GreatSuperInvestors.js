"use client";
import Image from "next/image";
import Link from "next/link";

export default function GreatSuperInvestor({ superinversor }) {
  return (
    <div className="flex flex-col items-center rounded-xl w-full border-2 border-[#00bdb0] group">
      <Link
        className="flex flex-col items-center w-full h-full"
        href={`/herramientas/superinvestors/${superinversor.attributes.slug}`}
      >
        <div className="flex flex-col relative rounded-xl min-h-[200px] lg:min-h-[300px] h-full w-full group-hover:hidden">
          <Image
            className="rounded-xl object-cover"
            alt="imagen"
            fill
            src={`${superinversor.attributes.imagenPrincipal.data.attributes.url}`}
            style={{ objectPosition: "left" }}
          />
        </div>
        <div className="hidden group-hover:flex flex-col relative rounded-xl justify-around p-5 min-h-[200px] lg:min-h-[300px] h-full w-full bg-white">
          <span className="text-black font-black text-2xl lg:text-3xl">
            {superinversor.attributes.name}
          </span>
          <span className="text-black font-bold text-lg lg:text-xl">
            Número de inversiones: {superinversor.attributes.nofStocks}
          </span>
          <span className="text-black font-black text-3xl lg:text-4xl">
            {superinversor.attributes.portfolioValue}
          </span>
        </div>
      </Link>
    </div>
  );
}
