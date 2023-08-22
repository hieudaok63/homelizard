import { useCallback } from "react";
import Slider from "rn-range-slider";

import BottomMetric, { type IBottomMetricProps } from "./BottomMetric";
import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import Thumb from "./Thumb";

type IProps = {
  lowProp?: number;
  highProp?: number;
  min: number;
  max: number;
  floatingLabel?: boolean;
  rangeDisabled?: boolean;
  handleValueChange?: (lowValue: number, highValue: number) => void;
  onSliderTouchEnd?: (lowValue: number, highValue: number) => void;
  disabled?: boolean;
  step?: number;
  showBottomMetric?: boolean;
  bottomMetricProps?: IBottomMetricProps;
  renderLabelProps?: (text: number | string) => void | JSX.Element;
};

export const RangePicker = (props: IProps) => {
  const {
    lowProp,
    highProp,
    min,
    max,
    floatingLabel,
    rangeDisabled,
    handleValueChange,
    onSliderTouchEnd,
    disabled,
    step,
    showBottomMetric,
    bottomMetricProps,
    renderLabelProps,
  } = props;

  const renderThumb = useCallback(
    (name: "high" | "low") => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <Rail selected={true} />, []);
  const renderLabel = useCallback((value: number) => {
    if (renderLabelProps) {
      return renderLabelProps(value);
    } else {
      return <Label text={value} />;
    }
  }, []);
  const renderNotch = useCallback(() => <Notch />, []);

  return (
    <>
      <Slider
        min={min}
        max={max}
        step={step || 1}
        disableRange={!!rangeDisabled}
        floatingLabel={!!floatingLabel}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        onSliderTouchEnd={onSliderTouchEnd}
        disabled={disabled}
        low={lowProp}
        high={highProp}
      />
      {showBottomMetric && bottomMetricProps ? (
        <BottomMetric
          stepNum={bottomMetricProps?.stepNum}
          values={bottomMetricProps?.values}
        />
      ) : null}
    </>
  );
};
