import { LinkType } from "@/types";

type LinkOrListType = LinkType | [string, LinkType[]];
export type NavListType = LinkOrListType[];
