import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const initialState = { username: "", password: ""}
    const [input, setInput] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
      if (props.isAuthenticated) {
        return navigate ('/basecamp/userhomepage')
      }
    }, [props.isAuthenticated])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const createdUserToken = await props.login(input);
      
      setInput(initialState);
    };
    
    const handleChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    return (
      <>
        <h1>Login</h1>
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
          <input type="submit" value="Go to BASECAMP" />
        </form>
      </>
    );
  };

  export default Login;