import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Definira tip za stanje uporabnika (User)
type User = {
  id: number;
  name: string;
  email: string;
};

// Definirajte tip za stanje konteksta (StateContextType)
interface StateContextType {
  user: User | null;
  token: string | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: (token: string | null) => void;
}

// Ustvari kontekst s začetnim stanjem
const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Komponenta ponudnika konteksta
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
