import PrivateRoute from "@comps/PrivateRoute";
import AdminDashboard from "@comps/AdminDashboard";

export default function Dashboard() {
  return <PrivateRoute Component={AdminDashboard} />;
}
