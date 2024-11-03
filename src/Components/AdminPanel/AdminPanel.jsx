import { useEffect } from "react";
import MainContent from "./MainContent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AdminPanel() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      toast.error("Access Denied");
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <div className="flex h-screen">
      {role === "admin" ? <MainContent /> : null}
    </div>
  );
}

export default AdminPanel;
