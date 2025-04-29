import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/libs/price-utils";

export default function CursoCard({ curso }) {
  const { attributes } = curso;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <Image
        src={attributes.imagen.data.attributes.url}
        alt={attributes.titulo}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {attributes.titulo}
        </h2>
        <p className="text-gray-600 mb-4">
          {attributes.informacion.substring(0, 100)}...
        </p>
        <p className="text-lg font-bold text-[#17498a] mb-4">
          Precio: {formatPrice(attributes.precio)}
        </p>
        <Link href={`/formacion/cursos/${attributes.url}`}>
          <span className="inline-block bg-[#54bcaf] text-white px-4 py-2 rounded hover:bg-[#3da396] transition-colors duration-300">
            Ver detalles
          </span>
        </Link>
      </div>
    </div>
  );
}
