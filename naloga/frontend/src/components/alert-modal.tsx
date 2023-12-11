// Uvoz potrebnih modulov in komponent
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./ui/button";

// Vmesnik za uporabnika
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

// Lastnosti za komponento AlertModal
interface AlertModalProps {
  isOpen: boolean; // Označuje, ali je modalno okno odprto
  onClose: () => void; // Funkcija za zapiranje modalnega okna
  onConfirm: (user?: User) => void; // Funkcija za potrditev dejanja (npr. brisanje)
  loading: boolean; // Označuje, ali poteka operacija (npr. nalaganje)
}

/**
 * AlertModal je modalna komponenta, ki se uporablja za prikaz opozorila ali potrditvenega pogovornega okna.
 * Uporabniku omogoča potrditev ali preklic dejanja.
 */
const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
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

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  // Prikaz modalnega okna z naslovom, opisom, gumbom za preklic in gumbom za potrditev
  return (
    <Modal
      title="Ste prepričani?" // Naslov opozorilnega modalnega okna
      description="Tega dejanja ni mogoče razveljaviti." // Opis opozorilnega modalnega okna
      isOpen={isOpen} // Ali je modalno okno odprto ali ne
      onClose={onClose} // Funkcija za zapiranje modalnega okna ob preklicu
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {/* Gumb za preklic */}
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Prekliči
        </Button>
        {/* Gumb za potrditev */}
        <Button
          variant="destructive"
          disabled={loading}
          onClick={handleConfirmClick}
        >
          Izbriši
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
