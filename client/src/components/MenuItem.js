import React, { useState, useContext, useEffect } from "react";
import { AiFillSignal, AiFillFrown, AiOutlineTeam } from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DataContext } from "../store/DataStore";

const menuData = [
  {
    title: "고객 포인트 조회",
    path: "/",
    icon: (
      <AiOutlineTeam
        style={{ marginRight: "3px", width: "19px", height: "19px" }}
      />
    ),
  },
  {
    title: "고객 환불",
    path: "/report",
    icon: <AiFillSignal style={{ marginRight: "5px", width: "17px" }} />,
  },
];

const Menu = styled.button`
  width: 92%;
  padding: 17px 0 17px 35px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  text-align: left;
  background-color: ${(props) => (props.isActive ? "#E8F1FE" : "transparent")};
  color: ${(props) => (props.isActive ? "#1a6dff" : "#666666")};

  &:hover {
    background-color: #e8f1fe;
    color: #1a6dff;
  }
`;

export function MenuItem() {
  const context = useContext(DataContext);
  const { currentPath, setCurrentPath } = context;

  const menuClicked = (e) => {
    setCurrentPath(e.currentTarget.value);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [currentPath]);

  return menuData.map((item, idx) => (
    <Link to={item.path}>
      <Menu
        key={idx}
        value={item.path}
        onClick={menuClicked}
        isActive={currentPath === item.path}
      >
        {item.icon}
        <span style={{ margin: "16px 0 16px 0" }}>{item.title}</span>
      </Menu>
    </Link>
  ));
}
