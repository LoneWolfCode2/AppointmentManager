"use client"
import React from 'react'
import dayjs from 'dayjs';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function DaySelection({ date, setDate, setEnd, end }) {


    const eightAM = dayjs().set('hour', 8).startOf('hour');
    const fivePM = dayjs().set('hour', 17).startOf('hour');
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ width: '40%' }}>
                    <h1>Start:</h1>
                    <MobileTimePicker maxTime={fivePM} minTime={eightAM} value={date} onChange={(newValue) => setDate(newValue)} />
                </div>
                <div style={{ width: '40%' }}>
                    <h1>End:</h1>
                    <MobileTimePicker maxTime={fivePM} minTime={date} value={end} onChange={(newValue) => setEnd(newValue)} />
                </div>
                {end?.toString()}
            </div>

        </LocalizationProvider>
    )
}

export default DaySelection