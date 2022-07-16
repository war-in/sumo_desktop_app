import SimpleTable from "../simpleTable";
import React from "react";

const Categories = () => {
    const Columns = [
        {"title": "Grupa wiekowa", "field": "personalDetails.names"},
        {"title": "Płeć", "field": "personalDetails.surname"},
        {"title": "Kategoria", "field": "category"},
    ]

    const dataset = [{}];

    return (
        <>
            <SimpleTable title={"Kategorie"} columns={Columns} data={dataset}/>
        </>
    )
}

export default Categories;