import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NewCampsite.css"


function NewCampsite(props) {
  const navigate = useNavigate();
  const initialState = { name: "", description: "", location: "", category: "", payForSite: false };
  const [campsiteInput, setCampsiteInput] = useState(initialState);

  // if (!props.isAuthenticated) {
  //   navigate('/basecamp/login', {new:true})
  //   return(
  //     <h1>redirecting to login</h1>
  //   )
  // }


  const addCampsite = async (data) => {
    const URL = `${process.env.REACT_APP_DB_URI}/basecamp`
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `bearer ${getUserToken()}`
        },
      };
    try {
      const createdCampsite = await fetch(URL, options);
      console.log(createdCampsite)
      const campData = await createdCampsite.json()
      console.log(campData)
      navigate("/basecamp/camplist", {new: true})
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

  // const handleAddCampsiteList = (e) => {
  //   e.preventDefault();
  //   [updatedCamp]
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
        
        <button type="submit">Gone Campin'</button>
      </form>
    </header>
  );
}

export default NewCampsite;