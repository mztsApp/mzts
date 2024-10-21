declare module "*.svg" {
  import { FC, HTMLAttributes, SVGProps } from "react";
  const content: FC<
    SVGProps<SVGElement> & HTMLAttributes<HTMLElement>["className"]
  >;
  export default content;
}

declare module "*.svg?url" {
  const content: unknown;
  export default content;
}
