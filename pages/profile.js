import PrivateRoute from "src/HOC/PrivateRoute";
import ViewProfile from "@comps/ViewProfile";

export default function Profile() {
  return <PrivateRoute Component={ViewProfile} />;
}
