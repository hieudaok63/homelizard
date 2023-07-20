import { Warning } from "./base-icon";

export interface IIconProps {
  w?: number;
  h?: number;
  stroke?: string;
  color?: string;
  className?: string;
  onClick?: (e?: any) => void;
}

export { Warning };
