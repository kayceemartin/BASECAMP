import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
import "../NewCampsite.css"


function NewCampsite(props) {
  const navigate = useNavigate();
  const initialState = { name: "", description: "", location: "", category: "", payForSite: false };
  const [campsiteInput, setCampsiteInput] = useState(initialState);

  const handleFetch = async () =>{
    const URL = "http://localhost:8000/basecamp"
    fetch(URL)
      .then(resp =>{
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        setCampsiteInput(data)
      })
  }

  const addCampsite = async (data) => {
    const URL = "http://localhost:8000/basecamp"
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`
        },
      };
    try {
      const createdCampsite = await fetch(URL, options);
      console.log(createdCampsite)
      
    } catch (err) {
      console.log(err);
    }
  };

  // const togglePayForSite = async (campsite) => {
  //   console.log(campsite)
  //   const configs = {
  //       method: 'PUT',
  //       body: JSON.stringify({payForSite: !campsite.payForSite}),
  //       headers: {
  //           'Content-Type': 'application/json'
  //       }
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    addCampsite(campsiteInput);
    setCampsiteInput(initialState);
    console.log('data to be sent:', campsiteInput)
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
          className="campsite-name-input-text"
          name="name"
          placeholder="campsite name"
          value={campsiteInput.name}
          onChange={handleChange}
        />
        <input
          className="campsite-des-input-text"
          name="description"
          placeholder="tell us about the campsite"
          value={campsiteInput.description}
          onChange={handleChange}
        />
        <input
          className="campsite-location-input-text"
          name="location"
          placeholder="location"
          value={campsiteInput.location}
          onChange={handleChange}
        />
        <input
          className="campsite-cat-input-text"
          name="category"
          placeholder="what type of camping was it?"
          value={campsiteInput.category}
          onChange={handleChange}
        />
        {/* <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onChange={togglePayForSite}
        />
        <label className="toggle-switch-label" htmlFor="togglePayForSite">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div> */}
        <button type="submit">Gone Campin'</button>
      </form>
    </header>
  );
}

export default NewCampsite;