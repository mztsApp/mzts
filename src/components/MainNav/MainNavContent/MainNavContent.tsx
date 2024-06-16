"use client";

import React from "react";
import { NavListType } from "../MainNav.types";
import { ALLOWED_BREAKPOINTS, useMedia } from "@/hooks";
import { MobileContent } from "./MobileContent";
import { DesktopContent } from "./DesktopContent";

interface MainNavContentProps {
  list: NavListType;
  isMenuOpen: boolean;
}

const MainNavContent = (props: MainNavContentProps) => {
  const { list, isMenuOpen } = props;

  const isMatchDesktop = useMedia(ALLOWED_BREAKPOINTS.MIN_LG);

  return isMatchDesktop ? (
    <DesktopContent list={list} />
  ) : (
    <MobileContent list={list} isMenuOpen={isMenuOpen} />
  );
};

export { MainNavContent };
