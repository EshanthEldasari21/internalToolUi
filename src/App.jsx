// import { Routes, Route } from "react-router-dom";
// import RegisterForm from "./components/auth/RegisterForm";
// import LoginForm from "./components/auth/LoginForm";
// import Dashboard from "./pages/dashboard";
// import TaskBoard from "./components/dashboard/Taskboard";
// import TimeSheet from "./components/dashboard/TimeSheet";
// import ProjectDashboard from "./components/dashboard/projectDashboard";
// import CreateOrganisation from "./pages/createOrganisation";   
// import ProjectTaskBoard from "./components/dashboard/projectTaskBoard";


// export default function App() {
//   return (
//     <Routes>
//       <Route path="/register" element={<RegisterForm />} />
//       <Route path="/login" element={<LoginForm />} />
//       <Route path="/dashboard" element={<Dashboard />} />

//       <Route path="/dashboard/*" element={<Dashboard />} >
//         <Route index element={<TaskBoard />} />
//         <Route path="dashboard" element={<TaskBoard />} />
//         <Route path="timeSheet" element={<TimeSheet />} />
        
//         <Route path="organisationDashboard/*" element={<ProjectDashboard />}>
       
//         <Route path="taskboard" element={<ProjectTaskBoard />} />
//         </Route>
  

//       </Route>

//       <Route path="createOrganisation" element={<CreateOrganisation />} />

//     </Routes>
//   )
// }


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

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

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

      </Route>

      <Route path="/createOrganisation" element={<CreateOrganisation />} />
    </Routes>
  );
}