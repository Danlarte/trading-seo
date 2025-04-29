function formatPrice(price) {
  // Asegurarse de que el precio es un número
  const numericPrice = typeof price === "string" ? Number(price) : price;

  // Elimina los dos últimos ceros y convierte a número
  const formattedPrice = Number(numericPrice.toString().slice(0, -2));

  // Convierte el número a string y separa la parte entera de los decimales
  const [integerPart, decimalPart] = formattedPrice.toFixed(2).split(".");

  // Añade el punto de los miles a la parte entera
  const integerWithSeparator = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Reconstruye el número con el formato deseado, omitiendo los decimales si son '00'
  return `${integerWithSeparator}${
    decimalPart !== "00" ? "," + decimalPart : ""
  } €`;
}
export default formatPrice;
