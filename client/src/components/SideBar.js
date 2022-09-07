import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/images/imweb_blue.png";
import { MenuItem } from "./MenuItem";
import { useResponsive } from "../hooks/useResponsive";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Box = styled.div`
  width: 260px;
  height: 100%;
  position: fixed;
  box-shadow: 0 4px 14px -4px #d1d1d1;
  background-color: #ffffff;
  text-align: center;
`;

const LogoImg = styled.img`
  width: 100px;
  padding-top: 46px;
`;

const LogoText = styled.p`
  font-weight: bold;
  font-size: 17px;
  margin: 6px 0 0 0;
  color: #666666;
`;

const IconBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 28px;
  margin-top: 12px;
  margin-left: 14px;
  color: #666666;
`;

const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export function SideBar() {
  const isHideSideBar = useResponsive();
  const [openSideBar, setOpenSideBar] = useState(false);

  const IconClicked = () => {
    setOpenSideBar(true);
    console.log(openSideBar);
  };

  useEffect(() => {
    if (isHideSideBar) {
      setOpenSideBar(false);
    }
  }, [isHideSideBar]);

  return isHideSideBar ? (
    openSideBar ? (
      <DarkBackground onClick={() => setOpenSideBar(false)}>
        <Box>
          <div style={{ marginBottom: "100px", textAlign: "center" }}>
            <LogoImg src={Logo} />
            <LogoText>BackEnd</LogoText>
          </div>
          <MenuItem />
        </Box>
      </DarkBackground>
    ) : (
      <IconBox onClick={IconClicked}>
        <AiOutlineDoubleRight style={{ width: "26px", height: "26px" }} />
      </IconBox>
    )
  ) : (
    <Box>
      <div style={{ marginBottom: "100px", textAlign: "center" }}>
        <LogoImg src={Logo} />
        <LogoText>BackEnd</LogoText>
      </div>
      <MenuItem />
    </Box>
  );
}
