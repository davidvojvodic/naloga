import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

/**
 * ModalProps je tip prop za komponento Modal.
 */
interface ModalProps {
  title: string; // Naslov modalnega okna
  description: string; // Opis modalnega okna
  isOpen: boolean; // Označuje, ali je modalno okno odprto
  onClose: () => void; // Funkcija za zapiranje modalnega okna
  children?: React.ReactNode; // Opcioni otroci komponente
}

/**
 * Modal je ponovno uporabna komponenta modalnega okna, ki lahko prikaže naslov, opis in prilagojeno vsebino.
 * Uporabljate jo lahko za ustvarjanje različnih vrst modalnih oken v aplikaciji.
 */
export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  // Funkcija za obvladovanje sprememb stanja odprtosti modalnega okna
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Renderiranje modalnega okna s naslovom, opisom in prilagojeno vsebino
  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Naslov modalnega okna */}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {/* Opis modalnega okna */}
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {/* Prilagojena vsebina znotraj modalnega okna */}
        <div>{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
