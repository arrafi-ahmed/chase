
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from './context/AuthContext';
import { CreatePdfContextProvider } from "./context/CreatePdfContext";
import CreateNewProject from './views/projects/CreateNewProject';
import MyProjects from './views/projects/MyProjects';
import ProjectInfo from './views/projects/ProjectInfo';
import Pendings from './views/pendings/Pendings';
import CreateOrder from './views/matAndOrders/CreateOrder';
import OrderList from './views/matAndOrders/OrderList';
import OrderDetails from './views/matAndOrders/OrderDetails';
import CreateContact from './views/contacts/CreateContact';
import Contacts from './views/contacts/Contacts';
import ContactDetails from './views/contacts/ContactDetails';
import CreateEmployee from './views/staff/CreateEmployee';
import StaffList from './views/staff/StaffList';
import Employee from './views/staff/Employee';
import ReportList  from './views/reports/Reports';
import Layout from './components/generalComponents/Layout';
import LoginForm from './views/login/LoginForm';
import Register from './views/login/register/RegisterForm';
import Home from './views/home/Home';
import ProjectSectionTasks from "./views/projects/ProjectSectionTasks";
import ProjectCreateTask from "./views/projects/ProjectCreateTask";
import ProjectEditInfo from "./views/projects/ProjectEditInfo";
import ForgotPassword from './views/forgotPassword/ForgotPassword';
import TaskInfoAndEdit from "./views/projects/TaskInfoAndEdit";
import ProjectInfoData  from "./views/projects/ProjectInfoData"
import ResetPassword from "./views/forgotPassword/ResetPassword";
import RequireAuth from "./components/authComponents/RequireAuth"
import { SectionMappingProvider } from './context/MappingContext';
import { Toaster } from 'react-hot-toast';
import "./App.css";


export default function App() {
  return (
    <AuthContextProvider>
    <SectionMappingProvider>
      <CreatePdfContextProvider>
      
      <Toaster />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route element={<Layout />}>
            
         
            <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-new-project" element={<CreateNewProject/>} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/project-info/:projectId" element={<ProjectInfo />} />
            <Route path="/project-info-data/:projectId" element={<ProjectInfoData />} />
            <Route path="/project-edit-info/:projectId" element={<ProjectEditInfo />} />
            <Route path="/project-section-tasks/:projectId/:sectionKey" element={<ProjectSectionTasks />} />
            <Route path="/project-create-task/:projectId/:sectionKey" element={<ProjectCreateTask />} />
            <Route path="/edit-task/:taskId" element={<TaskInfoAndEdit />} />
            <Route path="/pendings" element={<Pendings />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/allContacts" element={<Contacts />} />
            <Route path="/create-contact" element={<CreateContact />} />
            <Route path="/contact-details/:contactId" element={<ContactDetails />} />
            <Route path="/staff-list" element={<StaffList />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/employee/:employeeId" element={<Employee />} />
            <Route path="/reports" element={<ReportList />} />
            </Route>
         </Route> 
         

        </Routes>
      
      </CreatePdfContextProvider>
      </SectionMappingProvider>
    </AuthContextProvider>
  );
}


















