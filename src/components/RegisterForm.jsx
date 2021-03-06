import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
    const initialState = { username: "", password: ""}
    const [input, setInput] = useState(initialState);
    const navigate = useNavigate();

    useEffect(()=>{
      if (props.isAuthenticated){
        return navigate ('/basecamp/userhomepage')
      }
    }, [props.isAuthenticated])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const createdUserToken = await props.signUp(input);


      setInput(initialState);
    };
    
    const handleChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name: </label>
          <input
            id="username"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Join the camping community!" />
        </form>
      </>
    );
  };

  export default RegisterForm;