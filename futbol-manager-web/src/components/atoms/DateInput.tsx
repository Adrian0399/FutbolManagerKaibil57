import React from "react";
import {
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Label,
} from "@heroui/react";
import { CalendarDate, getLocalTimeZone, parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";

export interface DateInputProps {
  id?: string;
  name: string;
  label: string;
  description?: string;
  value?: string; // ISO format: YYYY-MM-DD
  onChange?: (value: string) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  minValue?: string; // ISO format: YYYY-MM-DD
  maxValue?: string; // ISO format: YYYY-MM-DD
  className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  label,
  description,
  value,
  onChange,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  isDisabled = false,
  minValue,
  maxValue,
  className = "w-full",
}) => {
  // Convertir string ISO a DateValue de HeroUI
  const parsedValue = React.useMemo(() => {
    if (!value) return null;
    try {
      return parseDate(value);
    } catch {
      return null;
    }
  }, [value]);

  // Convertir minValue y maxValue
  const parsedMinValue = React.useMemo(() => {
    if (!minValue) return undefined;
    try {
      return parseDate(minValue);
    } catch {
      return undefined;
    }
  }, [minValue]);

  const parsedMaxValue = React.useMemo(() => {
    if (!maxValue) return undefined;
    try {
      return parseDate(maxValue);
    } catch {
      return undefined;
    }
  }, [maxValue]);

  const handleChange = (newValue: DateValue | null) => {
    if (newValue && onChange) {
      // Convertir DateValue a formato ISO
      const isoString = newValue.toString();
      onChange(isoString);
    }
  };

  return (
    <div className={className}>
      <DatePicker
        id={id}
        name={name}
        isRequired={isRequired}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        value={parsedValue}
        onChange={handleChange}
        minValue={parsedMinValue}
        maxValue={parsedMaxValue}
      >
        <Label>{label}</Label>
        <DateField.Group fullWidth>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        {errorMessage ? (
          <FieldError>{errorMessage}</FieldError>
        ) : description ? (
          <Description>{description}</Description>
        ) : null}
        <DatePicker.Popover>
          <Calendar aria-label={label}>
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
    </div>
  );
};