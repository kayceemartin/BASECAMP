import React, { useState } from "react";
import './App.css';
import staticData from "./data.js";

function App() {
const [campsites, setCampsites] = useState([...staticData]);

  return (
    <div className="App">
      {/*Navigation*/}
      <nav className="navigation">
      <h1> </h1>
        <div className = "navigation__links-wrapper">
        <p>Top 50 Campsites</p>
        <p>Add a Campsite</p>
        </div>
      </nav>

      {/* Create Form */}
      <section className="container">
        <h2 className="container__title">Top 50 Campsites</h2>
        <main className="container__main">
          <table className="main__table">
            <thead className="table__head">
              <tr>
                <th>name</th>
                <th>location</th>
                <th>category</th>
                <th>pay for vist</th>
                <th>description</th>
                <th>likes</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {campsites && campsites.map((campsites, index) => (
                <tr className="table__row" key={campsites._id}>
                  <td>{campsites.name}</td>
                  <td>{campsites.location}</td>
                  <td>{campsites.category}</td>
                  <td>{campsites.payForSite ? "True" : "False"}</td>
                  <td>{campsites.description}</td>
                  <td>{campsites.likes}</td>
                  </tr>
              ))}  
            </tbody>
          </table>  
        </main>  
      </section>
    </div>
  );
}

export default App;
