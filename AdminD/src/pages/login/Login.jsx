import { login } from "../../redux/ducks/authDuck";
import { useSelector, useDispatch } from 'react-redux';
import { useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const username = useRef(null); 
    const password = useRef(null); 
    const isFetching = useSelector((state) => state.login.isFetching);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    const handleClick = async(e) => {
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    e.preventDefault();
    const result = await dispatch(
        login({ username: usernameValue, password: passwordValue })
      );
    if (result.error) {
        setErrorMessage('Something went wrong. Please try again.');
    } else {
      navigate('/');
    }
  };
  
  return (
    <form onSubmit={handleClick}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        ref={username}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        ref={password}
      />
        {errorMessage && (
        <p style={{ color: 'red', marginTop: 10 }}>{errorMessage}</p>
        )}
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </form>
  );
};

export default Login;