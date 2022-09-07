import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../store/DataStore";
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
import axios from "axios";

export default function PageViewChart() {
    const [chartData, setChartData] = useState([]);

    const context = useContext(DataContext);
    const { siteCode } = context;

    const getData = async () => {
        const response = await axios.get("/api/get-site-page-view-data", {
            params: {
                site_code: siteCode,
            }
        });
        setChartData(response.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{
                    top: 50,
                    right: 50,
                    left: 20,
                    bottom: 50
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mm" label={{ value: '월', offset: 20, position: 'right'}}/>
                <YAxis label={{ value: '회', offset: 20, position: 'top'}} domain={[0, dataMax => (40)]}/>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="page_view_count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
