import { type TextInputProps } from "react-native";

export interface AppInputProps extends TextInputProps {
  error?: string;
  label?: string;
}
