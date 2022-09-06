import React, { useContext } from 'react';
import axios from 'axios';

import { DataContext } from "../store/DataStore";

export async function ChurnDataApi() {
    const context = useContext(DataContext);
    const { churnData, setChurnData } = context;

    console.log("get churn data...");

    await axios
        .get("/api/get-churn-data")
        .then(function (response) {
            console.log(response.data);
            setChurnData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
