import { Routes, Route, useNavigate } from "react-router-dom";
import staticData from "../src/data";
import "./App.css";

// Component Imports
import Navigation from "./components/Navigation";
import NewCampsite from "./components/NewCampsite";
import CampsiteList from "./components/CampsiteList";
import CampsiteDetail from "./components/CampsiteDetail";
import EditCampsite from "./components/EditCampsites";

function HomePage() {
  return <h1>BASECAMP</h1>;
}

function App() {

  return (
    <div className="App">
      {/* Navigation */}
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Campsite List */}
        <Route path="/basecamp" element={<CampsiteList />} />
        {/* Show Page */}
        <Route path="/basecamp/:id" element={<CampsiteDetail />} />
        {/* Create Form */}
        <Route path="/basecamp/new" element={<NewCampsite />} />
        {/* Edit Form */}
        <Route path="/basecamp/:id/edit" element={<EditCampsite />} />
      </Routes>
    </div>
  );
}

export default App;
