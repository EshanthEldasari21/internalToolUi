import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Outlet, useNavigate } from "react-router-dom";

const ProjectDashboard = () => {

  const [projectName, setProjectName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const [projectData, setProjectData] = React.useState(
    JSON.parse(localStorage.getItem("projectData")) || []
  );

  const organisationData = JSON.parse(localStorage.getItem("organisationData")) || [];
  const currentOrg = organisationData.length > 0 ? organisationData[0] : null;

  const handleCreate = () => {

    if (!projectName.trim()) {
      alert("Project name is required");
      return;
    }

    const newProject = {
      id: Date.now(),
      projectName,
      description
    };

    const updatedProjects = [...projectData, newProject];

    localStorage.setItem("projectData", JSON.stringify(updatedProjects));

    setProjectData(updatedProjects);

    setProjectName("");
    setDescription("");
    setOpen(false);

    alert("Project created successfully!");
  };

  return (
    <>
      {/* Create Project Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">

          <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>
            Create New Project
          </h1>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>

            <input
              type="text"
              placeholder="Enter Project Name"
              className="mt-1 block w-full shadow-sm"
              style={{ padding: "8px", border: "1px solid #ccc" }}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              placeholder="Enter Project Description"
              rows={4}
              className="mt-1 block w-full shadow-sm"
              style={{ padding: "8px", border: "1px solid #ccc" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>

        </DialogContent>
      </Dialog>

      <div
        className="p-4"
        style={{ marginTop: "55px", marginLeft: "240px" }}
      >

        <h1 style={{ fontSize: "21px", fontWeight: "bold" }}>
         {currentOrg ? currentOrg.organisationName : "Organisation Name"}
        </h1>

        {/* Add Project Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              border: "1px solid black",
              padding: "0px 8px",
              borderRadius: "8px",
              backgroundColor: "black",
              color: "white",
              height: "5vh",
              fontSize: "14px",
            }}
            onClick={() => setOpen(true)}
          >
            + Add Project
          </button>
        </div>

        <Tabs defaultValue="projects" style={{ marginTop: "-15px" }}>
          <TabsList variant="line">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="workitems">Work items</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">

            {projectData.length > 0 ? (
              projectData.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    width: "450px",
                    minHeight: "150px",
                    padding: "20px",
                    borderRadius: "6px",
                    marginTop: "12px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    cursor: "pointer"
                   
                  }}
onClick={() =>
  navigate(`/dashboard/organisationDashboard/${proj.projectName}`)
}                >
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "8px"
                    }}
                  >
                    {proj.projectName}
                  </h2>

                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {proj.description}
                  </p>

                </div>
              ))
            ) : (
              <p style={{ color: "#555", marginTop: "10px" }}>
                No projects yet.
              </p>
            )}

          </TabsContent>

          {/* Work Items Tab */}
          <TabsContent value="workitems">
            <p style={{ marginTop: "10px" }}>
              No work items yet.
            </p>
          </TabsContent>

        </Tabs>
      </div>
<Outlet />
    </>
  );
};

export default ProjectDashboard;