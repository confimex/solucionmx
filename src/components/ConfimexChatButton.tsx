import asistenteImg from "@/assets/asistente-corto.png";
export default function ConfimexChatButton() {

 const abrirChat = () => {

  const tidio =
    (window as any).tidioChatApi;

  if (tidio) {

const botonTidio =
  document.querySelector(
    'iframe[src*="tidio"]'
  ) as HTMLElement;

if (botonTidio) {

  botonTidio.click();

}

  } else {

    alert(
      "El chat aún está cargando..."
    );

  }

};


}