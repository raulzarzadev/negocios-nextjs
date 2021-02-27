import { createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const user = {
    name: "jonh",
    lastName: "fix",
    age: "19",
  };
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
