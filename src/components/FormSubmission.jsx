import React from 'react'
import { Box, FormControl, TextField, Button } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import theme from '../components/ThemeRegistry/theme'

const mainColor = theme.palette.primary.main
const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
  background: ${theme.palette.mode === 'dark' ? 'transparent' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#444' : '#DAE2ED'};
  resize: none;

  &:hover{
    border-color: #fff;
  }

    &:focus {
    border-color: ${mainColor};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? mainColor : mainColor};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

function FormSubmission({ date, end, handleNext }) {
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [reason, setReason] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, fullName, reason)
        handleNext();
    }
    return (
        <>
            <Box sx={{ position: 'absolute' }}>

                <h1>START:</h1>
                <div className="">{date?.toDate().toLocaleString()}</div>
                <h1>END:</h1>
                <div className="">{end?.toDate().toLocaleString()}</div>
            </Box>
            <form onSubmit={handleSubmit}>


                <FormControl required sx={{ mx: 'auto', width: '100%' }}>
                    <Box sx={{ width: 800, p: 8, mx: 'auto' }}>
                        <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                            <TextField required sx={{ width: '50%' }} id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" variant="outlined" />
                            <TextField required sx={{ width: '50%' }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />

                        </Box>
                        <TextareaAutosize required minRows={12} reason={reason} onChange={(e) => setReason(e.target.value)} rows={12} aria-label="Reason" placeholder="Reason" />

                    </Box>
                </FormControl>
                <Button sx={{ position: 'absolute', right: 64, bottom: 16 }} variant="contained" type='submit'>Submit</Button>
            </form>
        </>
    )
}

export default FormSubmission