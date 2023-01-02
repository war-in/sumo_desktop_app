import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import LoginForm from "./LoginForm";

function Home() {
    const [isUserLoggedIn,setIsUserLoggedIn] = useState<boolean>(false)

  return (
    <Container className='home'>
      <h1>Home</h1>
        {isUserLoggedIn ?
            ("Logged in") :
            (<LoginForm setUserLoggedIn={setIsUserLoggedIn}/>)
        }
    </Container>
  );
}

export default Home;