import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  navigate("/login");
};

export default Logout;
