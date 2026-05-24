import react from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

import Dashboard from "./pages/Admin/Dashboard";
import Session from "./pages/Admin/Session";
import Subject from "./pages/Admin/Subject";
import Examinee from "./pages/Admin/Examinee";
import AdminLogin from "./pages/Admin/AdminLogin";
import QuestionBank from "./pages/Admin/QuestionBank";
import Examination from "./pages/Admin/Examination";
import Report from "./pages/Admin/Report";
import Contact from "./pages/Admin/Contact";
import Password from "./pages/Admin/Password";
import ExamResultsDeclaration from "./pages/Admin/ExamResultDeclaration";
import AdminHome from "./pages/Admin/AdminHome";

import UserDash from "./pages/User/UserDash";
import ContactA from "./pages/User/ContactA";
import MyExam from "./pages/User/MyExam";
import Profile from "./pages/User/Profile";
import GetExam from "./pages/User/GetExam";
import Chanpass from "./pages/User/Chanpass";
import Result from "./pages/User/Result";

import Component from "./pages/Component";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/adlogin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="session" element={<Session />} />
          <Route path="subject" element={<Subject />} />
          <Route path="examineet" element={<Examinee />} />
          <Route path="questionbank" element={<QuestionBank />} />
          <Route path="examination" element={<Examination />} />
          <Route path="report" element={<Report />} />
          <Route path="result" element={<ExamResultsDeclaration />} />
          <Route path="contact" element={<Contact />} />
          <Route path="password" element={<Password />} />
        </Route>

        {/* User Routes */}
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/contact1" element={<ContactA />} />
        <Route path="/myexam" element={<MyExam />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/getexam/:id" element={<GetExam />} />
        <Route path="/chanpass" element={<Chanpass />} />
        <Route path="/results" element={<Result />} />

        {/* Fallback Route */}
        <Route path="*" element={<Component />} />

      </Routes>
    </Router>
  );
}

export default App;