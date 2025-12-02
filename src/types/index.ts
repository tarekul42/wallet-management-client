import type { ComponentType } from "react";

export interface ISidebarItem {
  name: string;
  path: string;
  items?: {
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";
