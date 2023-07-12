import React, { type PropsWithChildren } from "react";

import { TransparentHeaderSafeView } from "~/components/ui";

export const LayoutForm = ({ children }: PropsWithChildren) => {
  return <TransparentHeaderSafeView>{children}</TransparentHeaderSafeView>;
};
