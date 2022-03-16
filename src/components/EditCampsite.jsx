import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const EditCampsite = (props) => {
    const initialState = {
        name: "",
        description: "",
        location: "",
        category: "",
        payForSite: false,
        likes: 0
    };

    const [input, setInput] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const getCampsiteToEdit = async () => {
        try {
            const id = props.match.params.id;
            const foundCampsite = await fetch("http://localhost:8000/allcampsites/" + id);
            const parsedCampsite = await foundCampsite.json();
            console.log(parsedCampsite);
            setInput(parsedCampsite);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const handleCheckBox = (e) =>
        setInput({ ...input, payForSite: !input.payForSite });
    const updateCampsite = async (id, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const updateCampsite = await fetch(
            "http://localhost:8000/basecamp/" + id,
            configs
        );
        const parsedUpdatedCampsite = await updateCampsite.json();
        console.log("after update:", parsedUpdatedCampsite);
        props.history.push("/camplist/" + id);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, location, description, category, payForSite, likes } = input;
        const campsiteData = { name, location, description, category, payForSite, likes };
        updateCampsite(input._id, campsiteData);
    };


    useEffect(() => {
        getCampsiteToEdit();
    }, []);

    return (
        <div>
            <h1>Edit Form</h1>
            {loading ? (
                <h3>...Gathering Firewood</h3>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Campsite Name</label>
                        <input
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Tell us about the campsite</label>
                        <input
                            id="description"
                            name="description"
                            value={input.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            name="location"
                            value={input.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Type of camping:</label>
                        <input
                            id="category"
                            name="category"
                            value={input.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="payForSite">Did you pay to camp?</label>
                        <input
                            id="payForSite"
                            name="payForSite"
                            checked={input.payForSite}
                            onChange={handleCheckBox}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label htmlFor="likes">Likes</label>
                        <input
                            id="likes"
                            name="likes"
                            value={input.likes}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Link to='/basecamp/camplist'><Button variant="primary">Back to Camplist</Button></Link>
                        <Link to='/basecamp/camplist'><Button variant="primary">Confirm Edit</Button></Link>
                    </div>

                </form>
            )}
        </div>
    )
}

export default EditCampsite;