import axiosClient from "@/axios-client";
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
import { DicesIcon } from "lucide-react";
import { useState, useEffect } from "react";

// Vmesnik, ki opisuje strukturo uporabnika
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

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
        // Nastavi pridobljene uporabnike v stanje
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Funkcija za izbor naključnega uporabnika
  const handleRandomUser = () => {
    axiosClient
      .post("/store-random-user") // Spremenite z ustreznim URL-jem
      .then((response) => {
        console.log(response.data);
        // Nastavi ime izbranega naključnega uporabnika
        setSelectedUserName(response.data.selectedUser.ime);
        // Prikaži sporočilo o uspehu
        toast({
          title: "Uspeh!",
          description: "Uporabnik je bil izbran.",
        });
      })
      .catch((error) => {
        // Prikaži sporočilo o napaki
        toast({
          title: "Napaka!",
          description: "Uporabnik ni bil izbran.",
          variant: "destructive",
        });
        console.log(error);
      });
  };

  return (
    <div>
      {/* Glava strani */}
      <div className="flex justify-between px-20 py-10 items-center">
        <Heading
          title="Nadzorna plošča"
          description="Izberite naključno ime iz seznama!"
        />
      </div>

      {/* Prikazovanje obremenitve, ko se podatki nalagajo */}
      {loading && (
        <div>
          <Loader />
        </div>
      )}

      {/* Prikazovanje vsebine, ko so podatki naloženi */}
      {!loading && (
        <div>
          {/* Prikaz izbranega naključnega uporabnika */}
          <div className="font-medium flex items-center bg-primary-foreground mx-20 border rounded-lg p-3 mb-10">
            Izbrani uporabnik:{" "}
            <span className="font-bold">&nbsp; {selectedUserName}</span>
          </div>

          {/* Tabela za prikaz seznama uporabnikov */}
          <div className="flex flex-col items-center justify-center gap-10 mx-20 border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Ime</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-left">Ustvarjen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="w-[100px]">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-left">
                      {user.created_at}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Gumb za izbor naključnega uporabnika */}
          <div className="flex items-center justify-center mt-10">
            <Button className="gap-2" onClick={handleRandomUser}>
              <DicesIcon />
              Izberi naključno
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
