import { useUser } from "src/context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrivateRoute({ Component, ...res }) {
  const router = useRouter();
  const { user } = useUser();
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (user) {
      setUserData(user);
      setLoading(false);
    }
    // console.log(user)
    if (user === null) router.replace("/");
  }, [user]);


  if (loading) return "Cargando ...";

  return <Component {...res} user={userData} />;
}
