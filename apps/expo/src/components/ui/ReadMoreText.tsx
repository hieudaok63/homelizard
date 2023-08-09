import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface readMoreTextProps {
  initialNumberOfLines: number;
  text: string;
}
const ReadMoreText = ({
  initialNumberOfLines = 2,
  text = "",
}: readMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= initialNumberOfLines); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        className=" font-weight_300 text-grey"
        numberOfLines={isExpanded ? undefined : initialNumberOfLines}
      >
        {text}
      </Text>
      {lengthMore && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text className="text-purply_blue mt-1 text-right font-nunito-bold">
            {isExpanded ? "weniger" : "mehr ..."}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ReadMoreText;
