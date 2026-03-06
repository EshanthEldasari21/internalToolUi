import DashboardLayout from "../components/layout/DashboardLayout"
// import TaskBoard from "../components/dashboard/taskboard"
import TimeSheet from "../components/dashboard/TimeSheet"
import { Route, Routes } from "react-router-dom"
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
export default function Dashboard() {
     
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (
        <div className="flex min-h-screen bg-gray-50">
             <Header user={userData}/>
            <DashboardLayout />
            <main className="flex-1 p-6">
                <Outlet/>
            </main>
        </div>
    )
}
