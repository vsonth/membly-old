import React, { useState } from 'react';
import { RRule } from 'rrule';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

// Frequency options
const frequencyOptions = [
  { value: RRule.DAILY, label: 'Daily' },
  { value: RRule.WEEKLY, label: 'Weekly' },
  { value: RRule.MONTHLY, label: 'Monthly' },
  { value: RRule.YEARLY, label: 'Yearly' },
];

// Weekday options
const weekdaysOptions = [
  { value: RRule.MO, label: 'Monday' },
  { value: RRule.TU, label: 'Tuesday' },
  { value: RRule.WE, label: 'Wednesday' },
  { value: RRule.TH, label: 'Thursday' },
  { value: RRule.FR, label: 'Friday' },
  { value: RRule.SA, label: 'Saturday' },
  { value: RRule.SU, label: 'Sunday' },
];

const RRuleField = ({ value, onChange }) => {
  const [frequency, setFrequency] = useState(value?.freq || RRule.WEEKLY);
  const [interval, setInterval] = useState(value?.interval || 1);
  const [weekdays, setWeekdays] = useState(value?.byweekday || []);

  // Update the RRule object
  const updateRRule = (updates) => {
    const newRRule = {
      freq: frequency,
      interval,
      byweekday: weekdays,
      ...updates,
    };
    onChange(newRRule);
  };

  // Handlers for updates
  const handleFrequencyChange = (option) => {
    setFrequency(option.value);
    updateRRule({ freq: option.value });
  };

  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value, 10) || 1;
    setInterval(newInterval);
    updateRRule({ interval: newInterval });
  };

  const handleWeekdayToggle = (day) => {
    const updatedWeekdays = weekdays.includes(day)
      ? weekdays.filter((d) => d !== day)
      : [...weekdays, day];
    setWeekdays(updatedWeekdays);
    updateRRule({ byweekday: updatedWeekdays });
  };

  return (
    <div>
      <label className="block font-medium mb-2">Frequency</label>
      <Listbox value={frequency} onChange={(value) => handleFrequencyChange({ value })}>
        <div className="relative">
          <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md text-left">
            {frequencyOptions.find((opt) => opt.value === frequency)?.label || 'Select Frequency'}
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {frequencyOptions.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  clsx(
                    'cursor-pointer select-none px-4 py-2',
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  )
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <label className="block font-medium mt-4 mb-2">Interval</label>
      <input
        type="number"
        value={interval}
        onChange={handleIntervalChange}
        min="1"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
      />

      {frequency === RRule.WEEKLY && (
        <>
          <label className="block font-medium mt-4 mb-2">Weekdays</label>
          <div className="flex flex-wrap gap-2">
            {weekdaysOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={clsx(
                  'px-3 py-1 rounded-md border',
                  weekdays.includes(option.value)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 text-gray-900 border-gray-300'
                )}
                onClick={() => handleWeekdayToggle(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RRuleField;
