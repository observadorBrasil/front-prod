import { ReactNode } from "react";

export interface Step {
  order: number;
  label: string;
  component: (s: Step) => ReactNode | ReactNode[];
}
