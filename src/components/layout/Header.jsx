// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useState } from "react";

// export default function Header({ user }) {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);

//   // Function to get initials
//   const getInitials = (firstName, lastName) => {
//     return `${firstName?.charAt(0).toUpperCase() || ""}${
//       lastName?.charAt(0).toUpperCase() || ""
//     }`;
//   };

//   return (
//    <>
//   {openModal && (
// <div style={{width: "80%", border: "1px solid black", backgroundColor: "white", padding: "10px", display: "flex", flexDirection: "column", gap: "10px"}}>
// <span>Profile</span>
// <span>Logout</span>
//    </div>
//   )} 
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         width: "100%",
//         position: "fixed",
//         alignItems: "center",
//         padding: "0 20px",
//         background: "white",
//         height: "60px",
//         borderBottom: "1px solid #e5e5e5",
        
//       }}
//     >
//       <h2
//         style={{
//           marginLeft: "30px",
//           fontWeight: "bold",
//             fontSize: "17px",
//             cursor: "pointer"
//         }}
//         onClick={()=> navigate("/dashboard")}
//       >
//         WFMS.
//       </h2>

//       {/* Right Side */}
//       <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//         {user ? (
     
//           <div
//             style={{
//               width: "45px",
//               height: "45px",
//               borderRadius: "50%",
//               backgroundColor: "#D9D9D9",
//               color: "#424242",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "16px",
//               cursor: "pointer",
              
//             }}

//             onClick={()=> setOpenModal(true)}
//           >
//             {user.username ? getInitials(user.username.split(" ")[0], user.username.split(" ")[1]) : "NA"}
//           </div>
//         ) :    (
        
//           <>
//             <Button
//               variant="outline"
//               onClick={() => navigate("/login")}
//               style={{height: "5vh"}}
//             >
//               Login
//             </Button>
//             <Button
//               onClick={() => navigate("/register")}
//                style={{height: "5vh"}}
//             >
//               Sign Up
//             </Button>
//           </>
//         )}
//       </div>
//     </div>

//     </>
//   );
// }


import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";

export default function Header({ user }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Get initials
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0).toUpperCase() || ""}${
      lastName?.charAt(0).toUpperCase() || ""
    }`;
  };

  return (
    <>
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
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <h2
          style={{
            marginLeft: "30px",
            fontWeight: "bold",
            fontSize: "17px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          WFMS.
        </h2>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            position: "relative", // 🔥 important for dropdown positioning
          }}
          ref={dropdownRef}
        >
          {user ? (
            <>
              {/* Avatar */}
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
                onClick={() => setOpenModal((prev) => !prev)}
              >
                {user.username
                  ? getInitials(
                      user.username.split(" ")[0],
                      user.username.split(" ")[1]
                    )
                  : "NA"}
              </div>

              {/* ✅ Dropdown */}
              {openModal && (
                <div
                  style={{
                    position: "absolute",
                    top: "55px",
                    right: "0",
                    width: "150px",
                    backgroundColor: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    padding: "8px 0",
                    zIndex: 200,
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      navigate("/dashboard/profile");
                      setOpenModal(false);
                    }}
                  >
                    Profile
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "red",
                    }}
                    onClick={() => {
                      localStorage.clear(); // or remove auth token
                      navigate("/login");
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                style={{ height: "5vh" }}
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
                style={{ height: "5vh" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}