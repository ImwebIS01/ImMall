import React from "react";
import styled from "styled-components";

import { ChurnItem } from "./ChurnItem";

const ItemBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 14px -4px #d1d1d1;
  padding: 30px;
  margin: 40px 25px 25px 25px;
  width: 84%;
  height: 1040px;
`;

export function ChurnBox(props) {
  return (
    <ItemBox>
      <h2>고객 포인트 조회</h2>
      <div style={{ width: "100%", alignItems: "center" }}>
        <ChurnItem churnData={props.churnData} />
      </div>
    </ItemBox>
  );
}
