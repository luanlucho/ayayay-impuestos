"use client";

import { Clock } from "lucide-react";
import React, { useRef } from "react";

import { TimePickerProps } from "./TimePicker.types";
import { TimePickerInput } from "ui/time-picker-input";

const TimePicker = (props: TimePickerProps) => {
  const { value, onChange, granularity = "seconds" } = props;
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <TimePickerInput
        picker="hours"
        date={value}
        setDate={onChange}
        ref={hourRef}
        onRightFocus={() => minuteRef.current?.focus()}
        title="Hours"
      />
      <span>:</span>
      <TimePickerInput
        picker="minutes"
        date={value}
        setDate={onChange}
        ref={minuteRef}
        onLeftFocus={() => hourRef.current?.focus()}
        onRightFocus={() => secondRef.current?.focus()}
        title="Minutes"
      />
      {granularity === "seconds" ? (
        <>
          <span>:</span>
          <TimePickerInput
            picker="seconds"
            date={value}
            setDate={onChange}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
            title="Seconds"
          />
        </>
      ) : null}
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
};

export default TimePicker;
