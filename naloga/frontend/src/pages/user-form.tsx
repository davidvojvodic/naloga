import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "@/axios-client";
import Heading from "@/components/heading";
import { Loader } from "@/components/loader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// Shema obrazca za validacijo
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

const UserForm = () => {
  const { id } = useParams(); // Pridobi ID uporabnika iz parametrov URL-ja
  const navigate = useNavigate(); // Funkcija za preusmerjanje na druge strani
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  // Funkcija, ki se sproži ob oddaji obrazca
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, values) // Posodobi obstoječega uporabnika
        .then(() => {
          toast({
            title: "Uspeh!",
            description: "Uporabnik je bil uspešno posodobljen.",
          });
          navigate("/users"); // Preusmeri nazaj na seznam uporabnikov
        })
        .catch((err) => {
          toast({
            title: "Napaka!",
            description: "Uporabnik ni bil posodobljen.",
            variant: "destructive",
          });
          console.log(err);
        });
    } else {
      axiosClient
        .post("/users", values) // Ustvari novega uporabnika
        .then(() => {
          toast({
            title: "Uspeh!",
            description: "Uporabnik je bil uspešno ustvarjen.",
          });
          navigate("/users"); // Preusmeri nazaj na seznam uporabnikov
        })
        .catch((err) => {
          toast({
            title: "Napaka!",
            description: "Uporabnik ni bil ustvarjen.",
            variant: "destructive",
          });
          console.log(err);
        });
    }
  };

  // Pridobi podatke uporabnika ob nalaganju strani
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.data);

          // Posodobi vrednosti obrazca tukaj
          form.reset({
            name: data.data.name,
            email: data.data.email,
            password: data.data.password,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id, form]);

  return (
    <>
      <div className="flex h-full justify-between px-20 py-10 items-center">
        {!loading && user.id && (
          <Heading
            title={`Posodobi uporabnika: ${user.name}`}
            description="Upravljanje sprememb uporabnika"
          />
        )}
        {!loading && !user.id && (
          <Heading
            title="Novi uporabnik"
            description="Ustvari novega uporabnika"
          />
        )}
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {loading && <Loader />}
      </div>
      {!loading && (
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
            }}
            className="border p-12 w-[550px] rounded-lg"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                {/* Polje za ime uporabnika */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime</FormLabel>
                      <FormControl>
                        <Input placeholder="Ime" {...field} />
                      </FormControl>
                      <FormDescription>Vnesite ime</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Polje za email uporabnika */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormDescription>Vnesite email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Polje za geslo uporabnika */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geslo</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Geslo" {...field} />
                      </FormControl>
                      <FormDescription>Vnesite geslo</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gumb za shranjevanje obrazca */}
                <Button className="w-full gap-2" type="submit">
                  Shrani
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default UserForm;
