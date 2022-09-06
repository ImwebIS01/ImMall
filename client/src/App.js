import React, { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import styled from "styled-components";
import { Churn, Report } from "./pages";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useResponsive } from "./hooks/useResponsive";
import { DataStore } from "./store/DataStore";
import axios from "axios";

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F2F2F2;
  overflow: auto;
`

const Contents = styled.div`
  width: 100%;
  padding-left: ${(props) => (props.isHideSideBar ? '0px' : '260px')};
`

function App() {
    const [churnData, setChurnData] = useState([]);
    const isHideSideBar = useResponsive();

    useEffect(() => {
        const getData = async () => {
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
        getData();
    }, []);

    return (
        <DataStore>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Body>
                    <SideBar/>
                    <Contents isHideSideBar={isHideSideBar}>
                        <Routes>
                            <Route path="/" element={<Churn churnData={churnData}/>}/>
                            <Route path="/report" element={<Report/>}/>
                        </Routes>
                    </Contents>
                </Body>
            </BrowserRouter>
        </DataStore>
    );
}

export default App;
