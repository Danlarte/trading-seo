import { fetchCursos } from "@/libs/api";
import CursoCard from "@/components/formacion/CursoCard";
import Encabezado from "@/components/home/Encabezado";

export default async function CursosPage() {
  const cursos = await fetchCursos();
  const cursosCompletos = cursos.filter(
    (curso) => curso.attributes.tipo === "completo"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Encabezado titulo="Cursos Completos" />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursosCompletos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>

      {cursosCompletos.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No hay cursos completos disponibles en este momento.
        </p>
      )}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Cursos Completos | TradingPRO",
    description:
      "Explora nuestra selección de cursos completos sobre trading y finanzas.",
  };
}
