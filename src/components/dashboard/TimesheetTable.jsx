// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
// import { useState,useEffect } from "react"
// import axios from "axios";
// export default function TimeSheetTable() {
//     const [timesheetdata,setTimeSheetData] = useState([]);
//     useEffect(()=>{
//         try{
//             const url = ``;
//             const response = axios.get(url);
//             console.log("Error Getting TimeSheetData",response);
//             setTimeSheetData(response);

            
//         }catch(error){
//             console.log("Error Getting Timesheet Data",error.message);
//         }
//     },[])
//     return (
//         <Table style={{ width: "75%", margin: "20px auto", marginTop: "80px", marginLeft: "200px", }} >
//             {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px]">Date</TableHead>
//                     <TableHead>Task Details</TableHead>
//                     <TableHead className="w-[100px]">Project Name</TableHead>
//                     <TableHead className="text-right w-[100px]">Hours Invested</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 <TableRow>
//                     <TableCell className="font-medium">10-05-2026</TableCell>
                   
// <TableCell className="font-medium">
//     <div style={{display: "flex", flexDirection: "column"}}>
//     <p>
//         API Integration
//     </p>
//     <p>Implement the connection between the React ticket creation form and the Node.js backend API.
//          Ensure that all form fields (title, description, priority, attachments, and any other metadata) 
//          are properly serialized and sent in the API request.</p>
//     </div>
//     </TableCell>

//                     <TableCell>Medgeo</TableCell>
                   
                    
//                     <TableCell className="text-right">3</TableCell>
//                 </TableRow>

//                  <TableRow>
//                     <TableCell className="font-medium">Ui header fix</TableCell>
//                     <TableCell className="whitespace-normal break-words">Implement the connection between the React ticket creation form and the Node.js backend API. Ensure that all form fields (title, description, priority, attachments, and any other metadata) are properly serialized and sent in the API request.</TableCell>
//                     <TableCell>Rooftop</TableCell>
//                     <TableCell className="text-right">1</TableCell>
//                 </TableRow>
//                  <TableRow>
//                     <TableCell className="font-medium">Security leaks prevented</TableCell>
//                     <TableCell className="whitespace-normal break-words">Implement the connection between the React ticket creation form and the Node.js backend API. Ensure that all form fields (title, description, priority, attachments, and any other metadata) are properly serialized and sent in the API request.</TableCell>
//                     <TableCell>Medgeo</TableCell>
//                     <TableCell className="text-right">2</TableCell>
//                 </TableRow>
//                  <TableRow>
//                     <TableCell className="font-medium">API Integration</TableCell>
//                     <TableCell className="whitespace-normal break-words">Implement the connection between the React ticket creation form and the Node.js backend API. Ensure that all form fields (title, description, priority, attachments, and any other metadata) are properly serialized and sent in the API request.</TableCell>
//                     <TableCell>Medgeo</TableCell>
//                     <TableCell className="text-right">1</TableCell>
//                 </TableRow>
//             </TableBody>
//         </Table>
//     )
// }


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

export default function TimeSheetTable() {

  const [timesheetdata] = useState([
    {
      date: "10 May 2026",
      title: "API Integration",
      description:
        "Integrated React ticket creation form with Node.js backend API and handled request validation.",
      projectName: "Medgeo",
      hours: 3,
    },
    {
      date: "11 May 2026",
      title: "UI Header Fix",
      description:
        "Fixed responsive navbar issues and aligned menu items properly across mobile and desktop.",
      projectName: "Rooftop",
      hours: 1,
    },
    {
      date: "12 May 2026",
      title: "Security Patch",
      description:
        "Resolved authentication token vulnerability and implemented improved API request validation.",
      projectName: "Medgeo",
      hours: 2,
    },
    {
      date: "13 May 2026",
      title: "Task Board Update",
      description:
        "Improved drag and drop behavior on task board and optimized state updates.",
      projectName: "TaskFlow",
      hours: 4,
    },
  ]);

  return (
    <div
      style={{
        width: "75%",
        marginTop: "90px",
        marginLeft: "220px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        padding: "10px",
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Task Details</TableHead>
            <TableHead className="w-[150px]">Project</TableHead>
            <TableHead className="text-right w-[120px]">
              Hours
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {timesheetdata.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {item.date}
              </TableCell>

              <TableCell>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontWeight: "600" }}>{item.title}</span>

                  <span
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.description}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span
                  style={{
                    background: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  {item.projectName}
                </span>
              </TableCell>

              <TableCell className="text-right font-semibold">
                {item.hours}h
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}