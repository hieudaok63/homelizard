import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";
import { type IInputRange, type IMarks } from "./type";

const customMarks: IMarks[] = [
  { value: 0, label: "0", key: 0 },
  { value: 100, label: "100", key: 10 },
  { value: 200, label: "200", key: 20 },
  { value: 300, label: "300", key: 30 },
  { value: 400, label: "400", key: 40 },
  { value: 500, label: "500", key: 50 },
  { value: 600, label: "600", key: 60 },
  { value: 700, label: "700", key: 70 },
  { value: 800, label: "800", key: 80 },
  { value: 900, label: "900", key: 90 },
  { value: 1000, label: "1000", key: 100 },
];
export const CustomInputRange = (props: IInputRange) => {
  const {
    step = 100,
    value = 1,
    minValue = 0,
    maxValue = 1000,
    marks,
    renderCustomMarks,
    ...prop
  } = props;
  const arrMarks: IMarks[] = marks
    ? marks.map((val, i) => ({ ...val, key: i * 10 }))
    : customMarks;
  const renderMarks = () => {
    return arrMarks.map((mark) => (
      <div
        key={mark.value}
        className="absolute translate-x-[-50%] text-xs text-slate-500"
        style={{
          left: `${mark.key}%`,
        }}
      >
        {mark.label}
      </div>
    ));
  };

  return (
    <div className="custom-input-range relative w-full">
      <InputRange
        allowSameValues={false}
        maxValue={maxValue}
        minValue={minValue}
        step={step}
        value={value}
        {...prop}
      />
      <div className="divider-container mb-2">
        {customMarks.map((_, index) => (
          <div
            key={index}
            className={`divider-container__item absolute top-[2px] translate-x-[-50%] text-red-500 left-[${
              index * 10
            }%]`}
            style={{
              left: `${index * 10}%`,
            }}
          />
        ))}
      </div>
      {renderCustomMarks ? renderCustomMarks() : renderMarks()}
    </div>
  );
};
