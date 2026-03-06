import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header({ user }) {
  const navigate = useNavigate();

  // Function to get initials
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0).toUpperCase() || ""}${
      lastName?.charAt(0).toUpperCase() || ""
    }`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        position: "fixed",
        alignItems: "center",
        padding: "0 20px",
        background: "white",
        height: "60px",
        borderBottom: "1px solid #e5e5e5",
        
      }}
    >
      <h2
        style={{
          marginLeft: "30px",
          fontWeight: "bold",
            fontSize: "17px",
            cursor: "pointer"
        }}
        onClick={()=> navigate("/dashboard")}
      >
        WFMS.
      </h2>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {user ? (
     
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#D9D9D9",
              color: "#424242",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {user.username ? getInitials(user.username.split(" ")[0], user.username.split(" ")[1]) : "NA"}
          </div>
        ) :    (
        
          <>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              style={{height: "5vh"}}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
               style={{height: "5vh"}}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}