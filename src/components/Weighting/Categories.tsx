import SimpleTable from "../simpleTable";
import React from "react";
// @ts-ignore
import declared from '../../mocks/Competitors.json';

const Categories = () => {
    const Columns = [
        {"title": "Grupa wiekowa", "field": "personalDetails.names"},
        {"title": "Płeć", "field": "personalDetails.surname"},
        {"title": "Kategoria", "field": "category"},
    ]

    return (
        <>
            <SimpleTable title={"Kategorie"} columns={Columns} data={declared}/>
        </>
    )
}

export default Categories;