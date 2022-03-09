import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function CampsiteList(props) {
  const [campsites, setCampsites] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const campsites = await fetch(DB_URI);
      const parsedCampsites = await campsites.json();
      setCampsites(parsedCampsites);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return loading ? (
    <p>Finding Firewood...</p>
  ) : (
    <section className="container">
      <h2 className="container__title">Campsite List</h2>
      <main className="container__main">
        <table className="main__table">
          <thead className="table__head">
            <tr>
              {/* <th className="table__head--id">id</th> */}
              <th>name</th>
              <th>location</th>
              {/* <th>description</th> */}
              <th>category</th>
              <th>Pay for a Camping Spot</th>
              <th>description</th>
              <th>likes</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {campsites &&
              campsites.map((campsites, index) => (
                <tr className="table__row" key={campsites._id}>
                  <td>
                    <Link to={campsites._id}>{campsites.name}</Link>
                  </td>
                  <td>{campsites.payForSite ? "True" : "False"}</td>
                  <td>{campsites.likes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default CampsiteList;