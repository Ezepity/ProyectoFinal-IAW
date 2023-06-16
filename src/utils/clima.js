export default function obtenerClima(temp) {
  let clima = "Temperatura fuera de rango";

  if (-30 < temp && temp < 12) clima = "frio";
  else if (12 <= temp && temp < 26) clima = "templado";
  else if (26 <= temp && temp < 50) clima = "caluroso";

  return clima;
}
