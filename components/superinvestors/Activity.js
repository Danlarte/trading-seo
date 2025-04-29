import { useQuery } from "@tanstack/react-query";
import TableComponent from "./TableComponent";

export default function Activity({ slug }) {
  const { data: actividad, isLoading } = useQuery({
    queryKey: [`Actividad ${slug}`],
    queryFn: () =>
      fetch(`/api/superinvestors?slug=${slug}&accion=getActivityBySlug`).then(
        (res) => res.json()
      ),
    refetchInterval: 60000,
  });

  return (
    <TableComponent
      title="Actividad"
      data={actividad || []}
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
