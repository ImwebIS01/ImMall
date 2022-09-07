import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import { ChurnBox } from "../components/ChurnBox";

import { DataContext } from "../store/DataStore";
import { ChurnDataApi } from "../apis/ChurnDataApi";

const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
`

export default function Churn(props) {
    return (
        <Box>
            <ChurnBox churnData={props.churnData}/>
        </Box>
    );
}
