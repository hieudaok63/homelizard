import React from "react";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";


const PatternMask = () => {
  return (
          <Svg width="100%" height="100%">
            <Defs>
              <Pattern
                id="pattern"
                patternUnits="userSpaceOnUse"
                width="88"
                height="176"
                patternTransform="scale(1) rotate(0)"
              >
                <Path
                  d="M12 0C12 -17.6731 26.3269 -32 44 -32V-32C61.6731 -32 76 -17.6731 76 0V32H44C26.3269 32 12 17.6731 12 0V0Z"
                  fill="#C4C4C4"
                />
                <Path
                  d="M-32 88C-32 70.3269 -17.6731 56 0 56V56C17.6731 56 32 70.3269 32 88V120H0C-17.6731 120 -32 105.673 -32 88V88Z"
                  fill="#C4C4C4"
                />
                <Path
                  d="M56 88C56 70.3269 70.3269 56 88 56V56C105.673 56 120 70.3269 120 88V120H88C70.3269 120 56 105.673 56 88V88Z"
                  fill="#C4C4C4"
                />
                <Path
                  d="M12 176C12 158.327 26.3269 144 44 144V144C61.6731 144 76 158.327 76 176V208H44C26.3269 208 12 193.673 12 176V176Z"
                  fill="#C4C4C4"
                />
              </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#pattern)" />
          </Svg>
  );
};

export default PatternMask;
