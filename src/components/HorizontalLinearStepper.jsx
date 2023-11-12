"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MonthSelection from './MonthSelection'
import DaySelection from './DaySelection'
const steps = ['Select Day', 'Select Time', 'Submit Request'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [date, setDate] = React.useState();
    const [end, setEnd] = React.useState();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 0) {
                // check rules for first step
                if (date) return prevActiveStep + 1
                else return;
            }
            return prevActiveStep + 1
        });
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment style={{ height: '100vhs' }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    {activeStep === 0 && (
                        <div className=""><MonthSelection date={date} setDate={setDate} /></div>
                    )}
                    {activeStep === 1 && (
                        <DaySelection date={date} setDate={setDate} end={end} setEnd={setEnd} />
                    )}
                    {activeStep === 2 && (
                        <>
                            <h1>START:</h1>
                            <div className="">{date?.toDate().toLocaleString()}</div>
                            <h1>END:</h1>
                            <div className="">{end?.toDate().toLocaleString()}</div>

                        </>

                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 32, position: 'absolute', bottom: 16, left: 64, right: 64 }}>
                        <Button
                            variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />


                        <Button variant='contained' onClick={handleNext} disabled={activeStep === 0 ? !date : !date && !end}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}