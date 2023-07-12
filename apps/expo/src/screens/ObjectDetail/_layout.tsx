import React, { type PropsWithChildren } from "react";

import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const ObjectDetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <GradientPatternBackground variant="white">
      {children}
    </GradientPatternBackground>
  );
};
