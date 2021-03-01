import { loginWithGoogle } from "firebase/client";
import { useUser } from "src/context/UserContext";
import styles from "./styles.module.css";

export default function LoginView() {
  const { setUser } = useUser();
  const handleClick = () => {
    loginWithGoogle()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.login_view}>
      <button onClick={handleClick}>ingresar con google</button>
    </div>
  );
}
