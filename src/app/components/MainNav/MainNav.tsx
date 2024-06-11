"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavListType } from "./MainNav.types";
import { IconButton } from "@radix-ui/themes";
import { useMedia } from "@/app/hooks";
import { AVILABLE_BREAKPOINTS } from "@/app/hooks";

interface NavProps extends React.ComponentProps<typeof NavigationMenu.Root> {
  logoIcon: React.ReactElement;
  listOfLink: NavListType;
}

interface NavContentProps {
  list: NavListType;
}

const NavContent = (props: NavContentProps) => {
  const { list } = props;

  const isDesktopMatch = useMedia(AVILABLE_BREAKPOINTS.MIN_LG);

  React.useEffect(() => {
    console.log("test mach", isDesktopMatch);
  }, [isDesktopMatch]);

  return (
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>
          <HamburgerMenuIcon />
        </NavigationMenu.Trigger>

        <NavigationMenu.Content forceMount={isDesktopMatch || undefined}>
          test test
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
};

const MainNav = (props: NavProps) => {
  const { logoIcon, listOfLink, ...restProps } = props;

  return (
    <NavigationMenu.Root {...restProps} className="w-full h-10">
      <NextLink passHref href="/">
        <IconButton>{logoIcon}</IconButton>
      </NextLink>

      <NavContent list={listOfLink} />
    </NavigationMenu.Root>
  );
};

export { MainNav };
