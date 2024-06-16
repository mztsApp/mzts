"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { NavListType } from "../../MainNav.types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { v4 as uuid } from "uuid";
import Link from "next/link";

interface DesktopContentProps {
  list: NavListType;
}

const DesktopContent = (props: DesktopContentProps) => {
  const { list } = props;

  return (
    <NavigationMenu.List className="flex">
      {list.map((item) => {
        const isNested = Array.isArray(item);
        const subMenuTitle = isNested ? item[0] : "";
        const subMenuContent = isNested ? item[1] : [];

        return isNested ? (
          <NavigationMenu.Item key={uuid()} className="">
            <NavigationMenu.Trigger className="">
              {subMenuTitle}

              <ChevronDownIcon className="w-6 h-6" />
            </NavigationMenu.Trigger>

            <NavigationMenu.Content>
              <ul>
                {subMenuContent.map(({ href, rel, target, children }) => (
                  <li key={uuid()}>
                    <Link href={href ?? "/"} target={target} rel={rel}>
                      {children}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ) : (
          <NavigationMenu.Item key={uuid()}>
            <Link href={item.href ?? "/"} rel={item.rel} target={item.target}>
              {item.children}
            </Link>
          </NavigationMenu.Item>
        );
      })}
    </NavigationMenu.List>
  );
};

export { DesktopContent };
