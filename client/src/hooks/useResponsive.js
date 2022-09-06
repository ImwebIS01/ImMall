import React from 'react';
import { useMediaQuery } from "react-responsive";

export function useResponsive() {
    const isHideSideBar = useMediaQuery({ maxWidth: '1385px' })

    return isHideSideBar;
}
