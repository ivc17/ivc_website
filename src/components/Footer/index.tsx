import { Typography } from '@mui/material'
import Box from 'components/Box'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: '0',
        left: 0,
        padding: '0 20px',
        width: '100%'
      }}
    >
      <Typography
        textAlign={'center'}
        fontWeight={900}
        fontSize={12}
        sx={{
          margin: '0 auto',
          width: 'max-content',
          background: (theme) => theme.palette.background.default
        }}
      >
        ©2022 IVC17. All rights reserved.
      </Typography>
    </footer>
  )
}
