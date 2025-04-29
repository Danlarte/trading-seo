import TableComponent from "./TableComponent";

export default function Stocks({ data, setHistorial }) {
  return (
    <TableComponent
      title="Inversiones actuales"
      data={data}
      headers={[
        "Historial",
        "Stock",
        "% de la cartera",
        "Actividad reciente",
        "Comparte",
        "Precio",
        "Valor",
        "Precio Actual",
        "Precio reportado",
        "52 Week Low",
        "52 Week High",
      ]}
      isLoading={false}
      showHistoryButton={true}
      setHistorial={setHistorial}
    />
  );
}
