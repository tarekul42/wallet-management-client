import type { ComponentType, ReactNode } from "react";

export interface ISidebarItem {
  name: string;
  path: string;
  icon?: ReactNode;
  items?: {
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";
