import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { DataContext } from "../store/DataStore";

const ItemRow = styled.tr`
  height: 45px;
  border-bottom: 1px solid #B3B3B9;
  color: #333333;

  &:hover {
    background-color: #E8F1FE;
    color: #1a6dff;
  }
`
const Item = styled.td`
  margin-right: 20px;
  text-align: center;
`

export function ChurnItem(props) {
    const navigate = useNavigate();

    const context = useContext(DataContext);
    const { setSiteCode, setCurrentPath, setDomainName } = context;

    const onClick = (site_code, domain_name) => {
        setSiteCode(site_code);
        setDomainName(domain_name);
        navigate('/report');
        setCurrentPath('/report');
    };

    return (
        <table style={{ margin: '0 auto', width: '85%', borderCollapse: 'collapse' }}>
            <tr style={{ height: '40px', borderBottom: '1.5px solid #B3B3B9' }}>
                <th>idx</th>
                <th>domain_name</th>
                <th>version</th>
                <th>start_at</th>
                <th>end_at</th>
                <th>gmv</th>
                <th>score</th>
            </tr>
            {props.churnData.map((item, idx) =>
                <ItemRow key={idx} onClick={() => onClick(item.site_code, item.domain_name)}>
                    <Item>{ idx + 1 }</Item>
                    <Item>{ item.domain_name }</Item>
                    <Item>{ item.version }</Item>
                    <Item>{ item.start_at }</Item>
                    <Item>{ item.end_at }</Item>
                    <Item>{ item.gmv }</Item>
                    <Item>{ item.score }</Item>
                </ItemRow>
            )}
        </table>

    );
}