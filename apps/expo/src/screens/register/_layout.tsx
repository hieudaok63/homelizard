import React, { type PropsWithChildren } from "react";

import { TransparentHeaderSafeView } from "~/components/ui";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="white">
      <TransparentHeaderSafeView>{children}</TransparentHeaderSafeView>
    </GradientPatternBackground>
  );
};
