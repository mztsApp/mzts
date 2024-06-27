import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Accordion from "@radix-ui/react-accordion";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { NavListType } from "../../MainNav.types";

interface MobileContentProps {
  isMenuOpen: boolean;
  list: NavListType;
}

const MobileContent = (props: MobileContentProps) => {
  const { isMenuOpen, list } = props;

  return (
    <NavigationMenu.Item className="h-12 uppercase font-normal">
      <NavigationMenu.Trigger className="flex justify-center items-center w-12 h-12">
        {isMenuOpen ? (
          <Cross1Icon className="w-7 h-7" />
        ) : (
          <HamburgerMenuIcon className="w-7 h-7" />
        )}
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="absolute left-1/2 flex flex-col justify-start items-center bg-green-400 w-screen -translate-x-1/2">
        <NavigationMenu.List className="flex flex-col justify-start items-center w-screen py-8">
          {list.map((item, index) => {
            const isNested = Array.isArray(item);

            const accordionTitle = isNested ? item[0] : "";
            const nestedLinks = isNested ? item[1] : [];

            return (
              <NavigationMenu.Item
                key={uuid()}
                className="flex justify-start items-center w-full h-fit"
              >
                {isNested ? (
                  <Accordion.Root
                    type="single"
                    collapsible
                    className="w-full uppercase"
                  >
                    <Accordion.Item
                      value={`item-${index}`}
                      className="flex flex-col w-full"
                    >
                      <Accordion.Trigger className="flex justify-between items-center w-full uppercase px-5 py-2">
                        {accordionTitle}V
                      </Accordion.Trigger>

                      <Accordion.Content className="w-sceen">
                        <ul className="flex flex-col justify-start items-start w-full py-1">
                          {nestedLinks.map(
                            ({ href, children, rel, target }) => (
                              <li
                                key={uuid()}
                                className="flex justify-start items-center w-full h-fit"
                              >
                                <Link
                                  className="w-full p-2 px-7 hover:bg-red-700 focus:bg-purple-400"
                                  href={href ?? "/"}
                                  target={target}
                                  rel={rel}
                                >
                                  {children}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                ) : (
                  <Link
                    href={item.href ?? "/"}
                    target={item.target}
                    rel={item.rel}
                    className="w-full px-5 py-2 hover:bg-red-700 focus:bg-purple-400"
                  >
                    {item.children}
                  </Link>
                )}
              </NavigationMenu.Item>
            );
          })}

          <NavigationMenu.Item className="flex w-full px-5">
            <Link passHref href="/" className="pt-4">
              <button>Zaloguj się</button>
            </Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

export { MobileContent };
