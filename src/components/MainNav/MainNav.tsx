"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { NavListType } from "./MainNav.types";
import { MainNavContent } from "./MainNavContent";

interface NavProps extends React.ComponentProps<typeof NavigationMenu.Root> {
  logoIcon: React.ReactElement;
  listOfLink: NavListType;
}

const MainNav = (props: NavProps) => {
  const { logoIcon, listOfLink, ...restProps } = props;

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <NavigationMenu.Root
      {...restProps}
      className="relative flex justify-between items-start lg:items-center w-full h-fit py-1 px-4 bg-green-400"
      onValueChange={() => setIsMenuOpen((prev) => !prev)}
    >
      <NavigationMenu.List className="flex justify-between items-start w-[calc(100vw-2rem)]">
        <NavigationMenu.Item className="h-12">
          <NextLink href="/">{logoIcon}</NextLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="flex items-center lg:h-12">
          <MainNavContent list={listOfLink} isMenuOpen={isMenuOpen} />
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export { MainNav };
