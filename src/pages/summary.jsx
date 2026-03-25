import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Summary = () => {
  const { projectName } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const projects =
      JSON.parse(localStorage.getItem("projectData")) || [];

    const currentProject = projects.find(
      (p) => p.projectName === projectName
    );

    setProject(currentProject);
  }, [projectName]);

  if (!project) return <p>Project not found</p>;

  const totalTasks = project.tasks?.length || 0;
  const completedTasks =
    project.tasks?.filter((t) => t.status === "completed").length || 0;

  return (
    <div style={{ marginLeft: "230px", marginTop: "65px" }}>
      <h1 style={{fontSize: "23px", fontWeight: "bold", marginLeft: "20px"}}>{project.projectName}</h1>

      <div style={{display: "flex", gap: "40px", alignItems: "flex-start"}}>

     

      <div
        style={{
          border: "1px solid #F9FAFB",
          backgroundColor: "white",
          width: "60%",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px",
          height: "20vh",
          boxShadow: "1px 1px 3px 2px #D4D4D4",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
          
        }}
      >
        <h2 style={{fontSize: "17.5px", fontWeight: "bold"}}>About this project</h2>

        <p style={{fontSize: "15px"}}> {project.description}</p>

     

   
      </div>

      <div style={{
          border: "1px solid #F9FAFB",
          backgroundColor: "white",
          width: "36%",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px",
          height: "40vh",
          boxShadow: "1px 1px 3px 2px #D4D4D4",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
          
        }} >
<h2 style={{fontWeight: "500", fontSize: "17.5px", }}>Project Stats</h2>
<div style={{display: "flex", flexDirection: "column", gap: "10px", marginLeft: "10px"}}>
<h3 style={{fontSize: "15px", color: "#292929"}}>Boards</h3>
<div style={{display: "flex", gap: "150px", fontSize: "14px", marginLeft: "5px"}}>
    <div>
        <p style={{fontWeight: "bold"}}>{totalTasks}</p>
        <span style={{color: "#7A7A7A", }}><p>Work items</p>created </span>
    </div>
    <div>
        <p style={{fontWeight:"bold"}}>{completedTasks}</p>
        <span style={{color: "#7A7A7A", }}><p>Work items</p>active </span>
    </div>
</div>
<div style={{display: "flex", gap: "150px", fontSize: "14px", marginLeft: "5px"}}>
    <div>
        <p style={{fontWeight: "bold"}}>{totalTasks}</p>
        <span style={{color: "#7A7A7A", }}><p>Work items</p>resolved </span>
    </div>
    <div>
        <p style={{fontWeight:"bold"}}>{completedTasks}</p>
        <span style={{color: "#7A7A7A", }}><p>Work items</p>completed </span>
    </div>
</div>
</div>



</div>



      </div>
<div style={{display: "flex", justifyContent: "flex-end"}}>
<div style={{
          border: "1px solid #F9FAFB",
          backgroundColor: "white",
          width: "36%",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px",
          height: "20vh",
          boxShadow: "1px 1px 3px 2px #D4D4D4",
        }}>
<h2 style={{fontWeight: "500", fontSize: "17.5px", }}>Members</h2>
      </div>
</div>
      
       </div>
  
  );
};

export default Summary;