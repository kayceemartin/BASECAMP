import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function CampsiteDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [campsite, setCampsite] = useState({
    name: "",
    location: "",
    category: "",
    payForSite: false,
    description: "",
    likes: 0,
  });

  const getCampsite = async () => {
    try {
      const foundCampsite = await fetch(`${DB_URI}/${id}`);
      if (foundCampsite.status === 200) {
        const parsedCampsite = await foundCampsite.json();
        console.log(parsedCampsite);
        setCampsite(parsedCampsite);
        setLoading(false);
      } else {
        // custom error handling on the front end
        navigate("/basecamp");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCampsite = async () => {
    try {
      const deletedCampsite = await fetch(`${DB_URI}/${id}`, {
        method: "DELETE",
      });
      const parsedCampsite = await deletedCampsite.json();
      console.log(parsedCampsite);
      navigate("/basecamp", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getCampsite(), []);
  
  return (
    <section className="container">
      <h2 className="container__title">Campsite Details: {id}</h2>
      <main className="container__main">
        {loading ? (
          <h3>
            <em>Finding Firewood...</em>
          </h3>
        ) : (
          <div>
            <h4>{campsite.name}</h4>
            <p>{campsite.description}</p>
            <p>Likes: {campsite.likes}</p>
            <p>Pay For a Camping Spot: {campsite.payForSite ? "True" : "False"}</p>
            <br />
            <button onClick={deleteCampsite}>Delete</button>{" "}
            <Link to={`/basecamp/${id}/edit`}>Edit</Link>
          </div>
        )}
      </main>
    </section>
  );
}

export default CampsiteDetail;