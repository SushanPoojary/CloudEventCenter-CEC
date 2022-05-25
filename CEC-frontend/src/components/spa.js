/* eslint-disable */
import Auth from "./auth";
import "../spaindex.css";
import Dashboard from "./dashboard";
import { useUserContext } from "../context/userContext";

function spa() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
    </div>
  );
}

export default spa;
