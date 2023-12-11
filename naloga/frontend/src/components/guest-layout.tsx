// Uvoz konteksta stanja iz ContextProvider
import { useStateContext } from "@/context/context-provider";

// Uvoz potrebne komponente za preusmeritev
import { Outlet, Navigate } from "react-router-dom";

// Komponenta za postavitev za goste (Guest Layout)
const GuestLayout = () => {
  // Pridobitev stanja žetona (token) iz konteksta
  const { token } = useStateContext();

  // Če je uporabnik prijavljen, preusmeri na nadzorno ploščo
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // V nasprotnem primeru prikaži vsebino, ki jo prejmeš prek potomcev (Outlet)
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
