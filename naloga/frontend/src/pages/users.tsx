import axiosClient from "@/axios-client";
import AlertModal from "@/components/alert-modal";
import Heading from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { FileEditIcon, PlusCircleIcon, TrashIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Vmesnik, ki opisuje strukturo uporabnika
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Ob nalaganju strani pridobi uporabnike
  useEffect(() => {
    getUsers();
  }, []);

  // Funkcija za pridobitev seznama uporabnikov
  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Funkcija za brisanje uporabnika
  const onDelete = (user: User) => {
    if (user) {
      axiosClient.delete(`/users/${user.id}`).then(() => {
        getUsers();
        setOpen(false); // Zapri modal po izbrisu
        setSelectedUser(null); // Ponastavi izbranega uporabnika
        toast({
          title: "Uspeh!",
          description: "Uporabnik je bil uspešno izbrisan.",
        });
      });
    }
  };

  // Funkcija za klik na gumb "Izbriši" pri uporabniku
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user); // Nastavi izbranega uporabnika
    setOpen(true); // Odpre modal
  };

  return (
    <div>
      {/* Alertni modal za potrditev brisanja */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (selectedUser) {
            onDelete(selectedUser);
          }
        }}
        loading={loading}
      />

      {/* Glava strani */}
      <div className="flex justify-between px-20 py-10 items-center">
        <Heading
          title="Uporabniki"
          description="Dodaj, posodobi ali izbriši uporabnike"
        />
        {/* Povezava za dodajanje novega uporabnika */}
        <Link to="/users/new">
          <Button className="gap-2">
            <PlusCircleIcon />
            Dodaj nov
          </Button>
        </Link>
      </div>

      {/* Prikaz obremenitve, ko se podatki nalagajo */}
      {loading && <Loader />}

      {/* Prikaz vsebine, ko so podatki naloženi */}
      {!loading && (
        <div className="flex flex-col items-center justify-center gap-10 mx-20 border rounded-lg">
          {/* Tabela za prikaz seznama uporabnikov */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Ime</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Ustvarjen</TableHead>
                <TableHead className="text-center">Dejanja</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="w-[100px]">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    {user.created_at}
                  </TableCell>
                  <TableCell className="text-center flex gap-2 justify-center">
                    {/* Povezava za urejanje uporabnika */}
                    <Link to={"/users/" + user.id}>
                      <Button className="gap-2">
                        <FileEditIcon />
                        Posodobi
                      </Button>
                    </Link>
                    {/* Gumb "Izbriši" */}
                    <Button
                      className="gap-2"
                      variant="destructive"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <TrashIcon />
                      Izbriši
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
