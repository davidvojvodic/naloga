// Uvoz potrebnih modulov in komponent
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/heading";
import { Link } from "react-router-dom";

import { useStateContext } from "@/context/context-provider";
import axiosClient from "@/axios-client";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

// Shema za preverjanje obrazca z Zod
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginPage = () => {
  // Pridobitev stanja uporabnika in žetona iz konteksta
  const { setUser, setToken } = useStateContext();

  // 1. Določite obrazec.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Določite obdelovalno funkcijo za oddajo obrazca.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: values.email,
      password: values.password,
    };

    // Pošiljanje POST zahteve za prijavo
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });

    console.log(payload);
  }

  return (
    // Prikaz komponente z animacijo
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
      }}
      className="border shadow-lg p-12 w-[550px] rounded-lg"
    >
      <Heading title="Vpis" description="Vpišite se v svoj račun" />
      {/* Obrazec z uporabo hooka za upravljanje obrazca */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Polje za email */}
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
          {/* Polje za geslo */}
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
          {/* Povezava na stran za ustvarjanje računa */}
          <p>
            Nimate še računa?{" "}
            <Link className="underline text-muted-foreground" to="/signup">
              Ustvarite ga tukaj
            </Link>
          </p>
          {/* Gumb za oddajo obrazca */}
          <Button className="w-full gap-2" type="submit">
            <LogIn />
            Vpiši me
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginPage;
