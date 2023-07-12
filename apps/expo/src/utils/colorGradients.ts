export const colorGradients = {
  yellow: {
    maskGradient: ["#F7CF20", "#F4BE17"],
  },
  blue: {
    maskGradient: ["#43A3F4", "#3483EB"],
  },
  white: {
    maskGradient: ["#f5f7f9", "#eceeef"],
  },
  turquoise: {
    maskGradient: ["#37E1EC", "#11BBB0"],
  },
  pink: {
    maskGradient: ["#EF8FAF", "#E75E7B"],
  },
};

export type ColorGradientVariant = keyof typeof colorGradients;
