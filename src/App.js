import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./frontend/pages/Home";
import About from "./frontend/pages/About";
import NotFound from "./frontend/pages/NotFound";
import NavBar from "./frontend/components/NavBar";
import CreateAccount from "./frontend/pages/CreateAccount";
import Signalez from "./frontend/pages/Signalez";
import ForgetPasswd from "./frontend/pages/ForgetPasswd";
import UrbanIssuesPage from './frontend/pages/UrbanIssuesPage';
import 'leaflet/dist/leaflet.css'
import LocationPicker from "./frontend/components/LocationPicker";
import UrbanIssueCard from "./frontend/components/UrbanIssueCard";
import IssueFilters from "./frontend/components/IssueFilers";
import ResetPassword from "./frontend/pages/ResetPassword";



function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/CreateAccount' element={<CreateAccount/>} />
          <Route path='/Signalez' element={<Signalez/>} />
          <Route path='/LocationPicker' element={<LocationPicker/>} />
          <Route path='/UrbanIssuesPage' element={<UrbanIssuesPage/>} />
          <Route path='/UrbanIssueCard' element={<UrbanIssueCard/>} />
          <Route path='/ForgetPasswd' element={<ForgetPasswd/>} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
          <Route path='/IssueFilters' element={<IssueFilters/>} />
          <Route path='/mockUrbanIssues' element={<mockUrbanIssues/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
