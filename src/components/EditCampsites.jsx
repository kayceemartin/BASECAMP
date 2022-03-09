import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const DB_URI = process.env.DB_URI || "htpp://localhost:8000/basecamp";

const EditCampsite = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialState = {
        name: "",
        location: "",
        category: "",
        payForSite: true,
        description: "",
        likes: 0,
    };
    const [loading, setLoading] = useState(true);
    const [campsite, setCampsite] = useState(initialState);

    const getCampsite = async () => {
        try {
            const foundCampsite = await fetch ("http://localhost:8000/basecamp/" + id);
            if (foundCampsite.status === 200) {
                const parsedCampsite = await foundCampsite.json();
                setCampsite(parsedCampsite);
                setLoading(false);
            }else{
                navigate("/basecamp");
            }
        } catch(err){
            console.log(err);
        }
    };

    const editCampsite = async (data) => {
        try{
            const config = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const campsiteResp = await fetch(DB_URI + `/${data._id}`, config);
            const editedCampsite = await campsiteResp.json();
            navigate(`/basecamp/${editedCampsite._id}`, {replace: true });
        } catch(err){
            console.log(err);
        }
    };

    useEffect(() => getCampsite(), [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting forms through props");
        editCampsite(campsite);
        setCampsite(initialState);
    };

    const handleChange = (e) => {
        if (e.target.name ==="likes") {
            e.target.value = Number(e.target.value);
        }
        const newObject = {...campsite, [e.target.name]: e.target.value};
        setCampsite(newObject)
    };

    if(loading) {
        return <h3> Gathering Firewood... </h3>;
    }

    return(
        <header className = "header">
            <h1 className= "header__title">Go Somewhere New</h1>
            <form className= "header__form--edit" onSubmit={handleSubmit}>
                <legend className = "form__legend">
                    Name
                    <input
                        className="form__input-text"
                        name="name"
                        placeholder = "Add your Campsite here"
                        value = {campsite.name}
                        onChange = {handleChange}
                        />
                    </legend>
                <legend className="form__legend">
                    Description
                    <input
                        className="form__input-text"
                        name="description"
                        placeholder="campsite description here"
                        value={campsite.description}
                        onChange={handleChange}
                    />
                </legend>
                <legend className="form__legend">
                    Likes
                    <input
                        className="form__input-text"
                        name="likes"
                        type="number"
                        value={campsite.likes}
                        onChange={handleChange}
                    />
                </legend>
                <button className="form__button">Update your campsite</button>     
            </form>

        </header>
    )
}

export default EditCampsite;