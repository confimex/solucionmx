function abrirWhatsApp(telefono, nombre) {
  const mensaje = `Hola ${nombre}, vimos tu solicitud en CONFIMEX. ¿Te puedo apoyar con tu diagnóstico y cita?`;

  const url = `https://wa.me/52${5514193964}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}