import SimpleTable from "../simpleTable";
import React from "react";
// @ts-ignore
import declared from '../../mocks/Competitors.json';

const Competitors = () => {
    const Columns = [
        {"title": "Imię", "field": "personalDetails.names"},
        {"title": "Nazwisko", "field": "personalDetails.surname"},
        {"title": "Kraj", "field": "country.name"},
        {"title": "Kategoria", "field": "category"}
    ]

    return (
        <>
            <SimpleTable title={"Zawodnicy"} columns={Columns} data={declared}/>
        </>
    )
}

export default Competitors;