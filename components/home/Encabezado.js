"use client";
import Image from "next/image";
import Link from "next/link";
export default function Encabezado({ titulo, href }) {
  return (
    <>
      {href ? (
        <Link className="w-full my-4" href={href}>
          <div className="flex flex-row bg-gradient-to-r from-[#17498a] to-[#54bcaf] justify-center items-center w-full lg:flex-nowrap flex-wrap px-6 py-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center lg:items-start justify-center lg:w-2/3 w-full">
              <span className="text-white text-xl lg:text-2xl font-inter font-bold uppercase">
                {titulo}
              </span>
            </div>
            <div className="lg:flex hidden flex-col items-end justify-center lg:w-1/3 w-full">
              <Image
                src="/Toros.png"
                width={180}
                height={18}
                alt="Toros logo"
                className="opacity-80"
              />
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-row my-4 bg-gradient-to-r from-[#17498a] to-[#54bcaf] justify-center items-center w-full lg:flex-nowrap flex-wrap px-6 py-4 rounded-xl shadow-md">
          <div className="flex flex-col items-center lg:items-start justify-center lg:w-2/3 w-full">
            <span className="text-white text-xl lg:text-2xl font-inter font-bold uppercase">
              {titulo}
            </span>
          </div>
          <div className="lg:flex hidden flex-col items-end justify-center lg:w-1/3 w-full">
            <Image
              src="/Toros.png"
              width={180}
              height={18}
              alt="Toros logo"
              className="opacity-80"
            />
          </div>
        </div>
      )}
    </>
  );
}
