import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TimeSheetTable() {

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const timesheetdata = [
    {
      date: "12 January 2026",
      month: "January",
      year: 2026,
      title: "Login Page UI",
      description: "Created responsive login page using React and Tailwind.",
      projectName: "TaskFlow",
      hours: 2,
    },
    {
      date: "18 January 2026",
      month: "January",
      year: 2026,
      title: "API Setup",
      description: "Connected login form with backend authentication API.",
      projectName: "TaskFlow",
      hours: 3,
    },
    {
      date: "02 February 2026",
      month: "February",
      year: 2026,
      title: "Dashboard Layout",
      description: "Implemented sidebar and header layout for dashboard.",
      projectName: "Rooftop",
      hours: 4,
    },
    {
      date: "15 February 2026",
      month: "February",
      year: 2026,
      title: "Task Card UI",
      description: "Designed reusable task card component.",
      projectName: "Rooftop",
      hours: 2,
    },
    {
      date: "02 March 2026",
      month: "March",
      year: 2026,
      title: "API Integration",
      description:
        "Integrated React ticket creation form with Node.js backend API.",
      projectName: "Medgeo",
      hours: 3,
    },
    {
      date: "05 March 2026",
      month: "March",
      year: 2026,
      title: "Task Board Update",
      description:
        "Improved drag and drop behavior on task board.",
      projectName: "TaskFlow",
      hours: 4,
    },
  ];

  const handleSearch = () => {
    const result = timesheetdata.filter(
      (item) => item.month === month && item.year === Number(year)
    );
    setFilteredData(result);
  };

  const exportToExcel = () => {

    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData = filteredData.map((item) => ({
      Date: item.date,
      Task: item.title,
      Description: item.description,
      Project: item.projectName,
      Hours: item.hours,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = {
      Sheets: { Timesheet: worksheet },
      SheetNames: ["Timesheet"],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "Timesheet_Report.xlsx");
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#333",
          marginLeft: "220px",
          marginTop: "80px",
        }}
      >
        My Timesheet Report
      </h2>

      {/* FILTER SECTION */}

      <div
        style={{
          width: "80%",
          marginTop: "30px",
          marginLeft: "210px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          padding: "25px",
          display: "flex",
          gap: "200px",
          alignItems: "center",
        }}
      >

        {/* MONTH */}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3>Month</h3>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{
              border: "1px solid black",
              width: "250%",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            <option value="">Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>

        {/* YEAR */}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3>Year</h3>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max="2100"
            style={{
              border: "1px solid black",
              width: "250%",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          style={{
            border: "1px solid black",
            padding: "1px",
            width: "20%",
            height: "5vh",
            marginTop: "31px",
            borderRadius: "4px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Search
        </button>
      </div>

      {/* TABLE */}

      <div
        style={{
          width: "80%",
          marginTop: "30px",
          marginLeft: "210px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          padding: "25px",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Task Details</TableHead>
              <TableHead className="w-[150px]">Project</TableHead>
              <TableHead className="text-right w-[120px]">Hours</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.date}</TableCell>

                  <TableCell>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontWeight: "600" }}>{item.title}</span>
                      <span style={{ fontSize: "13px", color: "#666" }}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No data found for selected month and year
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* EXPORT BUTTON */}
<div style={{display: "flex", justifyContent: "flex-end", width: "80%", marginLeft: "210px"}}>
      <button
        onClick={exportToExcel}
        style={{
          marginTop: "20px",
          marginLeft: "210px",
          padding: "8px 16px",
          background: "black",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Export to Excel
      </button>
</div>
    </div>
  );
}