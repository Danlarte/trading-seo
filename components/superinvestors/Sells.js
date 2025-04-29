import { useQuery } from "@tanstack/react-query";
import TableComponent from "./TableComponent";

export default function Sells({ slug }) {
  const { data: ventas, isLoading } = useQuery({
    queryKey: [`Ventas ${slug}`],
    queryFn: () =>
      fetch(`/api/superinvestors?slug=${slug}&accion=getSellsBySlug`).then(
        (res) => res.json()
      ),
    refetchInterval: 60000,
  });

  return (
    <TableComponent
      title="Ventas"
      data={ventas || []}
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
