import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./pages/dashboard";
import TaskBoard from "./components/dashboard/Taskboard";
import TimeSheet from "./components/dashboard/TimeSheet";
import ProjectDashboard from "./components/dashboard/projectDashboard";
import CreateOrganisation from "./pages/createOrganisation";
import ProjectTaskBoard from "./components/dashboard/projectTaskBoard";
import Profile from "./pages/profile";
import WorkItems from "./pages/workItems";
import Summary from "./pages/summary";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
 <Route element={<ProtectedRoute />}>
      <Route path="/dashboard/*" element={<Dashboard />}>

        <Route index element={<TaskBoard />} />
        <Route path="dashboard" element={<TaskBoard />} />
                <Route path="profile" element={<Profile/>} />
        <Route path="timeSheet" element={<TimeSheet />} />


        {/* Organisation Dashboard */}
        <Route path="organisationDashboard" element={<ProjectDashboard />} />

        {/* Project Taskboard */}
        <Route
          path="organisationDashboard/:projectName"
          element={<ProjectTaskBoard />}
        />

         <Route
          path="organisationDashboard/:projectName/workitems"
          element={<WorkItems/>}
        />

 <Route
          path="organisationDashboard/:projectName/summary"
          element={<Summary/>}
        />

      </Route> 
      
     

      <Route path="/createOrganisation" element={<CreateOrganisation />} />
      </Route>
    </Routes>
  );
}