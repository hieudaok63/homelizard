import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ValidationMode } from "react-hook-form";
import { type ZodRawShape, type ZodTypeAny, type z } from "zod";

interface IProps<T> {
  schema: z.ZodEffects<ZodTypeAny> | z.ZodObject<ZodRawShape>;
  mode?: keyof ValidationMode;
  defaultValues?: T;
}

export function useZodForm<TFormSchemaType>(props: IProps<TFormSchemaType>) {
  const { mode, schema } = props;

  const {
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
      isLoading,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
    },
    reset,
    control,
  } = useForm<TFormSchemaType>({
    mode: mode || "onChange",
    resolver: zodResolver(schema),
  });

  return {
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
      isLoading,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
    },
    reset,
    control,
  };
}
