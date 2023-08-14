"use client";

import React from "react";
import {DateRange, Range, RangeKeyDict} from "react-date-range";
import { ru } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type CalendarProps = {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
};

const Calendar:React.FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
    return (
        <DateRange rangeColors={["#262626"]}
                   ranges={[value]}
                   date={new Date()}
                   onChange={onChange}
                   direction={'vertical'}
                   showDateDisplay={false}
                   minDate={new Date()}
                   disabledDates={disabledDates}
                   locale={ru}
        />
    );
};
export default Calendar;