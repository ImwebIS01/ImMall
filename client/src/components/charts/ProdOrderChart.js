import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../store/DataStore";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import axios from "axios";

export default function ProdOrderChart() {
    const [chartData, setChartData] = useState([]);

    const context = useContext(DataContext);
    const { siteCode } = context;

    const getData = async () => {
        const response = await axios.get("/api/get-site-order-prod-data", {
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
            <BarChart
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
                <YAxis label={{ value: '개', offset: 20, position: 'top'}} domain={[0, dataMax => (15)]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="order_prod_count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
