import { ReactNode } from "react";

export interface IRoutes {
  caminho: string;
  children: ReactNode;
  titulo: string;
}
