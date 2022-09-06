import React, {useEffect, useState} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import searchApi from "../../apis/SiteDataApi";
import axios from "axios";

// const data = searchApi();

export default function Rechart(props) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get("/api/get-site-data", {
            params: {
                site_code: 'S201706275951b78686e29'
            }
        })
            .then(function (response) {
                const dataTemp = response.data.map((data) => {
                    return {
                        yyyy: data.yyyy,
                        mm: data.mm,
                        cnt: data.cnt,
                    }
                })
                setChartData([{}, ...dataTemp, {}]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 50
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mm" />
                <YAxis dataKey="cnt"/>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="cnt"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}