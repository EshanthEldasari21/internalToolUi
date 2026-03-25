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
      
        {isDashboardHome  && (
          <>
            <span
              style={{ cursor: "pointer", fontSize: "15px" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              Profile
            </span>

  
            <hr style={{width: "118%", marginLeft: "-15px"}} />

            <span
              style={{ cursor: "pointer", fontSize: "15px" }}
              onClick={() => navigate("/dashboard/organisationDashboard")}
            >
              Organisation
            </span>

            <hr  style={{width: "118%", marginLeft: "-15px"}}/>

            <span
              style={{ cursor: "pointer", fontSize: "15px" }}
              onClick={() => navigate("/dashboard/timeSheet")}
            >
              TimeSheet
            </span>
          </>
        )}

    
        {isOrganisationDashboard && (
          <>
            {organisations.map((org, index) => (
              <Card className="p-2" key={index}>
                <Button
                  variant="ghost"
                  className="w-full text-left"
                onClick={() => {
  localStorage.setItem("currentOrganisation", JSON.stringify(org));
  navigate("/dashboard/organisationDashboard");
}}
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
                marginLeft: "20px"
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
          <div style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "1px"}}>
            <h3 style={{ fontWeight: "bold", fontSize: "15px" }}>
           {projectName}
            </h3>

          
 <hr style={{width: "118%", marginLeft: "-15px"}}/>
            <span
              style={{ cursor: "pointer", fontSize: "15px", }}
              onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}/summary`
                )
              }

              
            >
              Summary
            </span>

           <hr style={{width: "118%", marginLeft: "-15px"}} />
           </div>

            <h4 style={{ fontSize: "13px", color: "#777" }}>Boards</h4>

            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}`
                )
              }
            >
              Boards
            </span>

            <span style={{ cursor: "pointer" }}>Backlogs</span>
            <span style={{ cursor: "pointer" }}>Sprints</span>
            <span style={{ cursor: "pointer" }}  onClick={() =>
                navigate(
                  `/dashboard/organisationDashboard/${projectId}/workitems`
                )
              }>Work Items</span>
          </>
        )}
      </aside>
    </>
  );
}