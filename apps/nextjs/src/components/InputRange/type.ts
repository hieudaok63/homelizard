import { type InputRangeProps } from "react-input-range";

export interface IMarks {
  value: number;
  label: string;
  key?: number;
}
export interface IInputRange extends InputRangeProps {
  /**
   * @marks a array of object include value, label. Each object will correspond to each step
   */
  marks?: IMarks[];

  /**
   * @renderCustomMarks render a array custom marks
   */
  renderCustomMarks?: () => JSX.Element[];

  /**
   * @formatLabel a function to custom label
   */
  formatLabel?: (value: number, type: string) => string;
}
