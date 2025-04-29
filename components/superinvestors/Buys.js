import { useQuery } from "@tanstack/react-query";
import TableComponent from "./TableComponent";

export default function Buys({ slug }) {
  const {
    data: compras = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [`Compras ${slug}`],
    queryFn: () =>
      fetch(`/api/superinvestors?slug=${slug}&accion=getBuysBySlug`)
        .then((res) => res.json())
        .then((data) => {
          return data || [];
        }),
    refetchInterval: 60000,
  });

  if (error) {
    console.error("Error al cargar las compras:", error);
  }

  return (
    <TableComponent
      title="Compras"
      data={compras}
      headers={[
        "Acción",
        "Actividad",
        "Cambio",
        "Momento",
        "Share",
        "Stock",
        "Año",
      ]}
      isLoading={isLoading}
    />
  );
}
