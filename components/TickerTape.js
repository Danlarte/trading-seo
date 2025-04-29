"use client";
import dynamic from "next/dynamic";
const TickerTape = dynamic(
  () => import("react-ts-tradingview-widgets").then((mod) => ({
    default: mod.TickerTape
  })),
  {
    ssr: false,
  }
);
export default function NewTickerTape() {
  return (
    <>
      <div className="flex flex-row justify-center items-center w-full  mx-auto p-2">
        <div className="flex flex-col w-full relative items-center">
          <div className="w-full h-full bg-trasparent absolute p-1"></div>
          <TickerTape
            displayMode="compact"
            locale="es"
            copyrightStyles={{
              parent: {
                display: "none",
              },
            }}
            colorTheme="light"
            width="100%"
          />
        </div>
      </div>
    </>
  );
}
