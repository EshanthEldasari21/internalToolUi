// import { Card } from "../ui/card";
// import { Button } from "../ui/button";
// import "./DashboardLayout.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from "./Header";
// import { Dialog, DialogContent } from "../ui/dialog";
// import CreateOrganisation from "../../pages/createOrganisation";
// import { useState, useEffect } from "react";

// export default function DashboardLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [openModal, setOpenModal] = useState(false);
//   const [organisations, setOrganisations] = useState([]);

//   // Detect if we are inside project dashboard
//   const isProjectRoute = location.pathname.includes(
//     "/dashboard/organisationDashboard"
//   );



//   // Load organisations from localStorage
//   useEffect(() => {
//     const storedData =
//       JSON.parse(localStorage.getItem("organisationData")) || [];

//     setOrganisations(storedData);

//     // Redirect if organisation exists
//     if (storedData.length > 0 && location.pathname === "/dashboard") {
//        navigate("/dashboard/organisationDashboard");
//     }
//   }, [navigate, location.pathname]);

//   // Handle Organisation click
//   const handleOrganisationClick = () => {
//     const storedData =
//       JSON.parse(localStorage.getItem("organisationData")) || [];

//     if (storedData.length === 0) {
//       setOpenModal(true);
//     } else {
//       navigate("/dashboard/organisationDashboard");
//     }
//   };

//   return (
//     <>


//       <Dialog open={openModal} onOpenChange={setOpenModal}>
//         <DialogContent className="max-w-lg">
//           <CreateOrganisation />
//         </DialogContent>
//       </Dialog>

//       <aside
//         className="bg-white border-r border-gray-200 p-4 flex flex-col gap-6"
//         style={{
//           paddingTop: "20px",
//           marginTop: "61px",
//           marginLeft: "-2px",
//           height: "100vh",
//           position: "fixed",
//           width: "210px",
//         }}
//       >
//         {!isProjectRoute ? (
//           // DEFAULT SIDEBAR
//           <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//             <span
//               style={{ marginLeft: "4px", cursor: "pointer" }}
//               onClick={() => navigate("/dashboard/profile")}
//             >
//               Profile
//             </span>

//             <div className="divider"></div>

//             <span
//               style={{ marginLeft: "4px", cursor: "pointer" }}
//               onClick={handleOrganisationClick}
//             >
//               Organisation
//             </span>

//             <div className="divider"></div>

//             <span
//               style={{ marginLeft: "4px", cursor: "pointer" }}
//               onClick={() => navigate("/dashboard/timeSheet")}
//             >
//               TimeSheet
//             </span>
//           </div>
//         ) : (
//           // PROJECT DASHBOARD SIDEBAR
//           <>
//             {organisations.map((org, index) => (
//               <Card className="p-2" key={index}>
//                 <Button
//                   variant="ghost"
//                   className="w-full text-left"
//                   onClick={() => navigate(`/dashboard/${org.organisationName.toLowerCase()}`)}
//                 >
//                   {org.organisationName}
//                 </Button>
//               </Card>
//             ))}

//             <span
//               style={{
//                 marginLeft: "25px",
//                 fontSize: "13px",
//                 color: "blue",
//                 cursor: "pointer",
//               }}
//               onClick={() => setOpenModal(true)}
//             >
//               + New Organization
//             </span>

            
//           </>
//         )}
//       </aside>
//     </>
//   );
// }


import { Card } from "../ui/card";
import { Button } from "../ui/button";
import "./DashboardLayout.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "../ui/dialog";
import CreateOrganisation from "../../pages/createOrganisation";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [organisations, setOrganisations] = useState([]);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const projectName = decodeURIComponent(pathSegments[2]);

console.log(projectName);

  const isDashboardHome = location.pathname === "/dashboard" || location.pathname === "/dashboard/profile" || location.pathname === "/dashboard/timeSheet";


  const isOrganisationDashboard =
    location.pathname === "/dashboard/organisationDashboard";

  const isProjectPage =
    pathSegments[0] === "dashboard" &&
    pathSegments[1] === "organisationDashboard" &&
    pathSegments[2];

  const projectId = pathSegments[2]

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("organisationData")) || [];
    setOrganisations(stored);
  }, []);

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg">
          <CreateOrganisation />
        </DialogContent>
      </Dialog>

      <aside
        className="bg-white border-r border-gray-200 p-4 flex flex-col gap-4"
        style={{
          marginTop: "61px",
          height: "100vh",
          position: "fixed",
          width: "210px",
        }}
      >
        {/* DASHBOARD HOME */}
        {isDashboardHome  && (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              Profile
            </span>

            <div className="divider"></div>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/organisationDashboard")}
            >
              Organisation
            </span>

            <div className="divider"></div>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/timeSheet")}
            >
              TimeSheet
            </span>
          </>
        )}

        {/* ORGANISATION DASHBOARD */}
        {isOrganisationDashboard && (
          <>
            {organisations.map((org, index) => (
              <Card className="p-2" key={index}>
                <Button
                  variant="ghost"
                  className="w-full text-left"
                  onClick={() =>
                    navigate(
                      `/dashboard/organisationDashboard/${org.organisationName}`
                    )
                  }
                >
                  {org.organisationName}
                </Button>
              </Card>
            ))}

            <span
              style={{
                fontSize: "13px",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => setOpenModal(true)}
            >
              + New Organization
            </span>
          </>
        )}

        {/* PROJECT PAGE SIDEBAR */}
        {isProjectPage && (
          <>
            <h3 style={{ fontWeight: "bold", fontSize: "15px" }}>
           {projectName}
            </h3>

            <div className="divider"></div>

            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}/overview`
                )
              }
            >
              Overview
            </span>
 <div className="divider"></div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}/summary`
                )
              }
            >
              Summary
            </span>

            <div className="divider"></div>

            <h4 style={{ fontSize: "13px", color: "#777" }}>Boards</h4>

            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}/boards`
                )
              }
            >
              Boards
            </span>

            <span style={{ cursor: "pointer" }}>Backlogs</span>
            <span style={{ cursor: "pointer" }}>Sprints</span>
            <span style={{ cursor: "pointer" }}>Work Items</span>
          </>
        )}
      </aside>
    </>
  );
}