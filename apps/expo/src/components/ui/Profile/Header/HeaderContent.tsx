import React from "react";

import { AppText } from "~/components/ui/AppText";

interface IHeaderContent {
  title: string;
  resultScreen?: boolean;
  resultScreenText?: string;
}

export const HeaderContent = ({
  title,
  resultScreen,
  resultScreenText,
}: IHeaderContent) => {
  return (
    <>
      <AppText
        text={title}
        className="text-font-32 font-weight_300 pb-2 pl-10 text-black"
      />
      {resultScreen && (
        <AppText
          text={resultScreenText}
          className="text-font-24 font-weight_600 pb-2 pl-4 text-black"
        />
      )}
    </>
  );
};
