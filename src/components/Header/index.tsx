import { Box, Typography } from '@mui/material'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'

export default function Header() {
  return (
    <Box>
      <Logo style={{ width: '100px', height: '100px' }} />
      <Typography>Fine Art</Typography>
      <Typography>Web</Typography>
      <Typography>Graphic Design</Typography>
      <></>
    </Box>
  )
}
