import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./frontend/pages/Home";
import About from "./frontend/pages/About";
import ArticlesList from "./frontend/pages/ArticlesList";
import Article from "./frontend/pages/Article";
import NotFound from "./frontend/pages/NotFound";
import NavBar from "./frontend/components/NavBar";
import CreateAccount from "./frontend/pages/CreateAccount";
import Signalez from "./frontend/pages/Signalez";
import Login from "./frontend/components/Login";
import 'leaflet/dist/leaflet.css'
import LocationPicker from "./frontend/components/LocationPicker";




function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/articles-list' element={<ArticlesList />} />
          <Route path='/article/:name' element={<Article />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/Signalez' element={<Signalez/>} />
          <Route path='/LocationPicker' element={<LocationPicker/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
