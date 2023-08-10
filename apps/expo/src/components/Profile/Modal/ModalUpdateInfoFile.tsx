import React, { useEffect } from "react";
import { View } from "react-native";
import { type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button, PopupModal } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import TextInput from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";

// types
interface FormDataType {
  blobName: string;
  link: string;
}
interface ModalUpdateInfoFileType {
  isShow: boolean;
  setIsShow: () => void;
  onSave: (data: FormDataType) => void;
}
// form schema
const formSchema = z.object({
  blobName: z.string().min(1, "Please enter a valid name"),
  link: z.string().url("Please enter a valid link"),
});

type FormSchemaType = z.infer<typeof formSchema>;
const ModalUpdateInfoFile = (props: ModalUpdateInfoFileType) => {
  const { isShow, setIsShow, onSave } = props;
  const { handleSubmit, control, reset } = useZodForm({
    schema: formSchema,
    defaultValues: {
      blobName: "",
      link: "",
    },
  });
  useEffect(() => {
    if (!isShow) {
      reset();
    }
  }, [isShow]);
  // functions
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    onSave(data);
  };

  return (
    <PopupModal
      style={{ alignItems: undefined, margin: "6%" }}
      modalVisible={isShow}
      hideModal={setIsShow}
      top="30%"
    >
      <View className="border-b  border-color_gray p-6">
        <AppText
          text="Add link"
          className="pt-5 text-center text-font-24 font-weight_400 text-placeholder"
        />
      </View>
      <View className="p-4">
        <TextInput
          control={control}
          name="blobName"
          placeholder="Name"
          className="w-300 mt-4"
        />
        <TextInput
          control={control}
          name="link"
          placeholder="Link"
          className="fx-1 mt-4"
        />
        <Button
          title="Upload"
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          className="mt-4 rounded-[25px]"
          // disabled={disabled}
        />
      </View>
    </PopupModal>
  );
};
export default ModalUpdateInfoFile;
