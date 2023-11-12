"use client"
import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

function MonthSelection({ date, setDate }) {
    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    const today = new Date();
    const todayDefaultTime = new Date(undefined, undefined, undefined, 8);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {date?.toString()}
            <DatePicker disablePast shouldDisableDate={isWeekend} value={date} onChange={(newvalue) => { setDate(newvalue) }} />
        </LocalizationProvider>
    )
}

export default MonthSelection