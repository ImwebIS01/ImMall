import React from 'react';
import axios from 'axios';

export function SiteDataApi() {
    console.log("get site data...");

    axios
        .get("/api/get-site-data", {
            params: {
                site_code: 'S201706275951b78686e29'
            }
        })
        .then(function (response) {
            console.log(response.data);
            return(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
