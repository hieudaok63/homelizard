import React, { useMemo } from "react";
import { Text, View } from "react-native";

export type IBottomMetricProps = {
  stepNum: number;
  values: Array<number | string>;
};

const BottomMetric = (props: IBottomMetricProps) => {
  const { stepNum, values } = props;

  const arrEl = useMemo(() => Array.from(Array(stepNum).keys()), [stepNum]);

  // main return
  return (
    <View className="mt-1 w-full px-2">
      <View className="h-4 flex-row">
        {arrEl?.map((item, index) => (
          <View
            key={item}
            className={`border-x-color_black relative h-2 flex-1 ${
              index === arrEl?.length - 1 ? "border-x" : "border-l"
            } `}
          >
            {index % 2 === 0 ? (
              <Text className="text-font-12 absolute -left-1 top-3 text-black opacity-20">
                {values[index / 2]}
              </Text>
            ) : null}
            {/* last item */}
            {index === arrEl?.length - 1 ? (
              <Text className="text-font-12 absolute -right-3 top-3 text-black opacity-20">
                {values[values?.length - 1]}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default BottomMetric;
