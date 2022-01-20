const formatearFecha = fecha => {
  const fechaFormateada = new Date(fecha);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  console.log(fechaFormateada.toLocaleDateString('es-ES', options));
  return fechaFormateada.toLocaleDateString('es-ES', options);
};

console.log(formatearFecha(new Date()));
