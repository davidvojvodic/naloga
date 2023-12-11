import { useStateContext } from "@/context/context-provider";
import { cn } from "@/lib/utils";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "@/axios-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { CircleUser, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { token, user, setUser, setToken } = useStateContext();

  // Obdelava dogodka iz odjave
  const onLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    axiosClient
      .post("/logout")
      .then(() => {
        setUser(null);
        setToken(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pridobitev podatkov o uporabniku ob naložitvi komponente
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  // Preusmeri na stran za prijavo, če ni prijavljenega uporabnika
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Seznam poti za navigacijo
  const routes = [
    {
      href: `/dashboard`,
      label: "Nadzorna plošča",
      // Preveri, ali trenutna pot ustreza tej poti, da jo označi kot aktivno.
      active: pathname === `/dashboard`,
    },
    {
      href: `/users`,
      label: "Uporabniki",
      active: pathname === `/users`,
    },
  ];

  return (
    <nav className="border-b px-5">
      <div className="flex h-16 items-center px-4 gap-10">
        <Link to={"/"} className="group flex items-center gap-3">
          <img
            src="public/name-picker-wheel.webp"
            alt="Logo"
            width={50}
            height={50}
            className="group-hover:animate-spin"
          />
          <h1 className="font-bold uppercase tracking-widest">Izberi ime</h1>
        </Link>
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "text-md lg:text-lg font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 justify-center p-2  outline-none">
                <Avatar>
                  <AvatarImage src="public/avatar.png" />
                </Avatar>
                <p className="font-bold">{user.name}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="justify-center flex items-center gap-2">
                  <CircleUser />
                  Moj račun
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="justify-center flex items-center gap-2"
                >
                  <LogOut />
                  Odjavi se
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
