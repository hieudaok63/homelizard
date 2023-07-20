import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps } from "react-hook-form";
import { type z } from "zod";

type IProps<T extends z.Schema> = {
  schema: T;
} & Omit<UseFormProps<z.infer<T>>, "resolver">;

export function useZodForm<TFormSchemaType extends z.Schema>(
  props: IProps<TFormSchemaType>,
) {
  const { schema, mode, ...useFormProps } = props;

  return useForm<z.infer<TFormSchemaType>>({
    resolver: zodResolver(schema),
    mode: mode || "onBlur",
    ...useFormProps,
  });
}
