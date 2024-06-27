import { ValueOf } from "@/types";
import React from "react";
import { LAYOUT_VARIANTS } from "./MainLayout.constants";
import { MainNav } from "../MainNav";
import Image from "next/image";
import { Box } from "../Box";

interface MainLayoutProps extends React.PropsWithChildren {
  variant?: ValueOf<typeof LAYOUT_VARIANTS>;
}

//TODO: fix displaying of layout (height and other place style)

//TODO: add variant for user panel
const MainLayout = (props: MainLayoutProps) => {
  const { children, variant = LAYOUT_VARIANTS.DEFAULT } = props;

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-full text-white bg-black">
      <MainNav
        logoIcon={
          <Image
            src="/logo.webp"
            width={68.59}
            height={48}
            alt="logo MZTS"
            className="object-[-0.3rem_0.2rem] object-cover w-12 h-12"
          />
        }
        listOfLink={[
          [
            "Związek",
            [
              {
                href: "/",
                children: "Sędziowie",
              },
              { href: "/", children: "Zgłoszenia" },
              { href: "/", children: "Zasady Płatności" },
              { href: "/", children: "Cennik FTS" },
              { href: "/", children: "Deklaracje" },
              { href: "/", children: "Członkostwo" },
            ],
          ],
          [
            "Dokumentacja",
            [
              { href: "/", children: "item 1" },
              { href: "/", children: "item 2" },
            ],
          ],
          [
            "Współpraca",
            [
              { href: "/", children: "item 1" },
              { href: "/", children: "item 2" },
            ],
          ],
          [
            "Media",
            [
              { href: "/", children: "item 1" },
              { href: "/", children: "item 2" },
            ],
          ],
          [
            "Wydarzenia",
            [
              { href: "/", children: "item 1" },
              { href: "/", children: "item 2" },
            ],
          ],
          { href: "/", children: "Przepisy" },
          { href: "/", children: "Kalendarz" },
          { href: "/", children: "Kontakt" },
        ]}
      />

      {children}
    </div>
  );
};

export { MainLayout };
