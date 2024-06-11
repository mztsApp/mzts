import NextLink from "next/link";

export type LinkType = Partial<
  Pick<
    React.ComponentProps<typeof NextLink>,
    "href" | "children" | "target" | "rel"
  >
>;
