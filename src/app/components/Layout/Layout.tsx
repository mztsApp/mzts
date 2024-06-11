import { ValueOf } from "@/types";
import React from "react";
import { LAYOUT_VARIANTS } from "./Layout.constants";
import { MainNav } from "../MainNav";
import { SunIcon } from "@radix-ui/react-icons";

interface LayoutProps extends React.PropsWithChildren {
  variant?: ValueOf<typeof LAYOUT_VARIANTS>;
}

//TODO: add variant for user panel
const Layout = (props: LayoutProps) => {
  const { children, variant = LAYOUT_VARIANTS.DEFAULT } = props;

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-full text-white bg-black">
      <MainNav
        logoIcon={<SunIcon />}
        listOfLink={[{ href: "tes", children: "dfsfsd" }]}
      />

      {children}
    </div>
  );
};

export { Layout };
