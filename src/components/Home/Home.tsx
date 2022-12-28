import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import LoginForm from "./LoginForm";
import MaterialTable from "@material-table/core";
import axios from "axios";
import Competition from "../../objects/Competition";
import {BsTrash, BsCheckLg} from "react-icons/bs";

type Props = {
    setSelectedCompetition: (competition: Competition) => void;
}

const Home: React.FC<Props> = (props: Props) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)
    const [shuldShowLoginForm, setShuldShowLoginForm] = useState<boolean>(false)
    const [shuldShowCompetitionTabble, setShuldShowCompetitionTabble] = useState<boolean>(false)
    const [competitions, setCompetitions] = useState<Competition[]>([])
    const showLogin = () => {
        setShuldShowLoginForm(true)
        setShuldShowCompetitionTabble(false)
    }
    const showCompetitionTabble = () => {
        axios.get("http://localhost:8080/competition").then(result => setCompetitions(result.data))
        setShuldShowLoginForm(false)
        setShuldShowCompetitionTabble(true)
        console.log(competitions)
    }

    const Columns = [
        {"title": "Nazwa", "field": "name"},
        {"title": "Miasto", "field": "city"},
        {"title": "Typ", "field": "type.type"},
        {"title": "startDate: ", "field": "startDate"}
    ]

    return (
        <Container className='home'>
            <h1>Home</h1>
            <Button onClick={showLogin}>
                Zaloguj
            </Button>
            <Button onClick={showCompetitionTabble}>
                Wybierz z istniejących imprez
            </Button>
            {
                shuldShowLoginForm ?
                    isUserLoggedIn ?
                        ("ZALOGOWANO I ZAJEBIście") :
                        (<LoginForm setUserLoggedIn={setIsUserLoggedIn}/>)
                    : <></>
            }
            {
                shuldShowCompetitionTabble ?
                    <MaterialTable data={competitions} columns={Columns} actions={
                        [{
                            icon: () => <BsTrash/>,
                            tooltip: "Wybierz zawody",
                            onClick: (event, rowData) => {
                                console.log(rowData)
                                props.setSelectedCompetition(new Competition(rowData.name,rowData.city,rowData.type.type,rowData.startDate,rowData.id))
                                sessionStorage.clear()
                            },
                        }]
                    }/>
                    : <></>
            }

        </Container>
    );
}

export default Home;