import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import Credentials from "../../objects/Credentials";
import axios from "axios";

type Props = {
    setUserLoggedIn: (state: boolean) => void
}


const LoginForm: React.FC<Props> = (props) => {
    const [credentials, setCredentials] = useState<Credentials>(new Credentials("", ""))

    const fetchData = async () => {
        let {data} = await axios.get("http://localhost:8080/login?username="+credentials.username+"&password="+credentials.password)
        props.setUserLoggedIn(data)
    }

    const setUsername = (username: string) => {
        setCredentials((prevState => {
            return new Credentials(username, prevState.password)
        }))
    }

    const setPassword = (password: string) => {
        setCredentials((prevState => {
            return new Credentials(prevState.username,password)
        }))
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Login" onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="StandardButton" onClick={fetchData}>
                Log in
            </Button>
        </Form>
    )
}
export default LoginForm