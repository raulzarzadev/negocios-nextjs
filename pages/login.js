import LoginView from "@comps/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "src/context/UserContext";

export default function Login() {
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  });
  return <LoginView />;
}
