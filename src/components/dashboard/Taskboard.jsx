import React from 'react'
import { Card } from '../ui/card';
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
const Taskboard = () => {
  const today = new Date().toISOString().split("T")[0];

  const [punchData, setPunchData] = useState({
    date: today,
    punchIn: null,
    punchOut: null,
    totalHours: null,
  });

  // Load today's data on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendance")) || {};
    if (savedData[today]) {
      setPunchData(savedData[today]);
    }
  }, []);

  const handlePunchIn = () => {
    const now = new Date();
    const updatedData = {
      ...punchData,
      punchIn: now.toLocaleTimeString(),
      punchOut: null,
      totalHours: null,
    };

    saveData(updatedData);
  };

  const handlePunchOut = () => {
    if (!punchData.punchIn) return alert("Please Punch In first!");

    const now = new Date();
    const punchInTime = new Date(`${today} ${punchData.punchIn}`);
    const diffMs = now - punchInTime;

    const totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2);

    const updatedData = {
      ...punchData,
      punchOut: now.toLocaleTimeString(),
      totalHours,
    };

    saveData(updatedData);
  };

  const saveData = (data) => {
    const allData = JSON.parse(localStorage.getItem("attendance")) || {};
    allData[today] = data;
    localStorage.setItem("attendance", JSON.stringify(allData));
    setPunchData(data);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const name = userData ? userData.username : "User";
  return (
    <div style={{paddingLeft: "240px", marginTop: "65px"}}>
      <h1 style={{marginTop:"15px", fontSize: "18px"}}>Welcome, <span style={{fontWeight: "bold"}}>{name}!</span></h1>
      <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
      <div>
        <Card className='p-4' style={{marginTop: "20px", width: "400px", height: "200px", display: "flex", flexDirection: "column",}} >
          <div style={{display: "flex", alignItems: "center", gap: "20px", paddingTop: "10px"}} >
            <span style={{ backgroundColor: "#f0f0f0", width: "50px", height: "50px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", fontWeight: "bold"}}>{name.charAt(0)}</span>
          <div  >
            <h2 style={{fontSize: "18px", fontWeight: "bold"}} >{name}</h2>
          <p style={{fontSize: "14px", color: "#555", fontWeight: "500"}} >{userData ? userData.role[0].toUpperCase() + userData.role.slice(1) : "Employee"}</p>
          <p style={{fontSize: "14px", color: "#555",}}> IT Developer, Junior Web Developer </p>
          </div>
            </div>
          <div className="divider" style={{height: "1px", width: "109%", backgroundColor: "#e0e0e0", marginTop: "10px"}}></div>

          <div style={{display: "flex", gap: "50px", paddingBottom: "40px", paddingLeft: "20px"}}>
            <button style={{padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>Manager Details</button>
            <button style={{padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>My salary</button>
          </div>
        </Card>
       </div>
       <div style={{marginTop: "20px"}}>
        <Card
    className='p-4' style={{ width: "400px", height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: "40px"}}
    >
      <h2 className="text-lg font-bold">Today's Attendance</h2>

      <p style={{marginTop: "-20px", color: "#555", fontSize: "14px"}}>Date: {punchData.date}</p>
      <div style={{display: "flex", gap: "20px", marginBottom: "-10px"}} >
<p style={{color: "#555", fontSize: "14px"}}>Punch In: {punchData.punchIn || "--:--:--"}</p>
      <p style={{color: "#555", fontSize: "14px"}}>Punch Out: {punchData.punchOut || "--:--:--"}</p>
        <p style={{color: "#555", fontSize: "14px"}}>Total Hours: {punchData.totalHours || "0.00"} hrs</p>
      </div>
      
  

      {!punchData.punchIn && (
        <Button onClick={handlePunchIn}>Punch In</Button>
      )}

      {punchData.punchIn && !punchData.punchOut && (
        <Button onClick={handlePunchOut}>Punch Out</Button>
      )}

      {punchData.punchOut && (
        <Button variant="outline" onClick={handlePunchIn}>
          Start New Day
        </Button>
      )}
    </Card>
       </div>
     
       
     
    </div>
    </div>
  )
}

export default Taskboard