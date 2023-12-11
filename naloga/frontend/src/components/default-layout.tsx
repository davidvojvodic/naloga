// Uvoz konteksta stanja iz ContextProvider
import { useStateContext } from "@/context/context-provider";

// Uvoz komponente za preusmeritev
import { Navigate } from "react-router-dom";

// Uvoz komponente Outlet iz react-router-dom za prejemanje podpoti
import { Outlet } from "react-router-dom";

// Uvoz komponente Navbar
import Navbar from "./navbar";
import { useState, useEffect } from "react";

// Komponenta za privzeti postavitev (Default Layout)
const DefaultLayout = () => {
  // Pridobitev stanja žetona (token) iz konteksta
  const { token } = useStateContext();
  // Stanje za sledenje, ali je komponenta nameščena
  const [isMounted, setIsMounted] = useState(false);

  // useEffect za nastavitev stanja isMounted na true ob namestitvi komponente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Če komponenta ni nameščena, vrni null (ne prikaži ničesar)
  if (!isMounted) {
    return null;
  }

  // Če uporabnik ni prijavljen, ga preusmeri na stran za prijavo
  if (!token) {
    return <Navigate to="/login" />;
  }

  // V nasprotnem primeru prikaži navigacijsno vrstico (Navbar) in vsebino, ki jo prejmeš prek potomcev (Outlet)
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
