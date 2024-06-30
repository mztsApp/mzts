import React from "react";
import { ValueOf } from "@/types";
import { BOX_ALLOWED_TAG, BOX_SIZE_VARIANT } from "./Box.constants";
import { twMerge } from "tailwind-merge";

interface BoxCustomProps extends React.PropsWithChildren {
  boxSize?: ValueOf<typeof BOX_SIZE_VARIANT>;
  as?: ValueOf<typeof BOX_ALLOWED_TAG>;
  restProps?: Omit<React.ComponentProps<"div">, "className">;
  internalClassName?: string;
  externalClassName?: string;
}

const SIZE_CLASS = {
  [BOX_SIZE_VARIANT.LAYOUT]: "w-screen px-3 lg:px-12",
};

const InnerComponent = (
  props: Omit<BoxCustomProps, "as" | "resProps" | "externalClassName">
) => {
  const { children, boxSize, internalClassName = "" } = props;

  return boxSize === BOX_SIZE_VARIANT.LAYOUT ? (
    <div className={internalClassName}>{children}</div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

//TODO: Overite color diplay style

//should use to wrapp something which have to be default layout size
const Box = (props: BoxCustomProps) => {
  const {
    as: htmlTag = BOX_ALLOWED_TAG.DIV,
    boxSize = BOX_SIZE_VARIANT.LAYOUT,
    children,
    internalClassName,
    externalClassName,
    ...restProps
  } = props;

  const Component = htmlTag;
  const sizeClass = SIZE_CLASS?.[boxSize];

  return (
    <Component
      className={twMerge(
        sizeClass,
        "flex justify-center items-center gap-4 bg-[#9747FF]",
        externalClassName
      )}
      {...restProps}
    >
      <InnerComponent
        internalClassName={twMerge(internalClassName, "w-full max-w-[90rem]")}
        boxSize={boxSize}
      >
        {children}
      </InnerComponent>
    </Component>
  );
};

export { Box };
