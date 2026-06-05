import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Matching() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/video-chat");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Finding Someone...
      </h1>

      <p>Matching you with people around the world</p>
    </div>
  );
}