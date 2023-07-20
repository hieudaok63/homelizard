import { UseFormRegisterReturn } from "react-hook-form";

import { TOptions } from "~/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../select";

interface TCustomSelectProps {
  options: object[];
}

interface FormSelectProps extends UseFormRegisterReturn {
  children?: React.ReactNode;
  options: {
    value: string | number | boolean;
    label: string;
  }[];
}
export const CustomSelect = () => {
  return (
    <Select>
      <SelectTrigger className="h-10 text-gray-500 placeholder:text-gray-600">
        <SelectValue
          className="text-gray-500 placeholder:text-gray-600"
          placeholder="Pick an option"
        />
      </SelectTrigger>
      <SelectGroup>
        <SelectContent className="border-1 border border-gray-700">
          <SelectItem value={"1"}>Male</SelectItem>
          <SelectItem value={"2"}>Female</SelectItem>
          <SelectItem value={"3"}>Others</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};
