import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NewCampsite.css"

const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function NewCampsite(props) {
  const navigate = useNavigate();
  const initialState = { name: "" };
  const [campsiteInput, setCampsiteInput] = useState(initialState);

  const addCampsite = async (data) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const campsiteResp = await fetch(DB_URI, config);
      const newCampsite = await campsiteResp.json();
      console.log(newCampsite);
      navigate("/basecamp", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCampsite(campsiteInput);
    setCampsiteInput(initialState);
  };

  const handleChange = (e) => {
    const newObject = { ...campsiteInput, [e.target.name]: e.target.value };
    setCampsiteInput(newObject);
  };

  return (
    <header className="header">
      <h1 className="header__title">Go Somewhere New</h1>
      <form className="header__form" onSubmit={handleSubmit}>
        <input
          className="form__input-text"
          name="name"
          placeholder="add a campsite"
          value={campsiteInput.name}
          onChange={handleChange}
        />
        <button type="submit">Gone Campin'</button>
      </form>
    </header>
  );
}

export default NewCampsite;