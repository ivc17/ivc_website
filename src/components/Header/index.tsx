import { Box, Typography } from '@mui/material'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'

export default function Header() {
  return (
    <Box position="fixed" top={'0'} left={'0'} width="100%">
      <Box position="relative">
        <Box
          sx={{ background: '#000000' }}
          width="100%"
          height="40px"
          marginLeft={'40px'}
        ></Box>

        <Box
          width="40px"
          height="100%"
          minHeight={'100vh'}
          mt="-40px"
          position="absolute"
          top={0}
          left={40}
          sx={{ background: '#ffffff' }}
        >
          apple apple apple apple
        </Box>
        <Box padding={'20px 0 0 100px'}>
          <Logo style={{ minHeight: '100px', height: '18vh' }} />
          <Typography fontSize={40}>Fine Art</Typography>
          <Typography fontSize={40}>Web</Typography>
          <Typography fontSize={40}>Graphic Design</Typography>
          <Typography fontSize={40}>Photography</Typography>
        </Box>
      </Box>
    </Box>
  )
}
