import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((store) => store.userReducer);

  if (token !== "") {
    return children;
  }
  return <Navigate to="/login" />;
}
