import { fb_listenUserFavorites, onAuthStateChanged } from "firebase/client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      fb_listenUserFavorites(user.id, (favorites) => {
        setFavoritesList(favorites.map((fav) => fav.advertId));
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, favoritesList }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
