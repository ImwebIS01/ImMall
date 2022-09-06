import React from 'react'
import styled from "styled-components";

const siteConfig = [
    {
        site_code: "1c",
        site_name: "아임웹"
    },
    {
        site_code: "2c",
        site_name: "아임웹2"
    },
    {
        site_code: "3c",
        site_name: "아임웹3"
    },
]

const SelectBox = styled.select`
  width: 320px;
  height: 42px;
  padding: 8px;
  border: 1.5px solid lightgray;
  border-radius: 3px;
  color: #333333;
  font-size: 16px;
`

export function SelectSite() {
    return (
        <SelectBox name="select_site" id="select_stie">
            {siteConfig.map((item, idx) =>
                <option value={ item.site_code }>{ item.site_name }</option>
            )}
        </SelectBox>
    );
}