import { CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <div style={{width:"100vw", margin:"auto"}}>
      <CircularProgress color="inherit" sx={{margin:90, height:30, marginTop:40}} />
    </div>
  )
}

export default Spinner