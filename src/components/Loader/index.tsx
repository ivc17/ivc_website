import Box from 'components/Box'
import { CircularProgress, Typography } from '@mui/material'

var isMobile = require('is-mobile')()

export default function Loader({ progress }: { progress: number }) {
  return (
    <Box
      id="loader"
      zIndex={2000}
      position="fixed"
      top="50%"
      left="50%"
      sx={{ transform: 'translate(-50%, -50%)' }}
    >
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="center"
        position="relative"
      >
        <CircularProgress size={280} sx={{ color: '#000000' }} />
        <Box
          position={'absolute'}
          sx={{
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            fontWeight: 900,
            fontSize: '60px',
            color: '#000000'
          }}
        >
          {progress}%
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 900, fontSize: '30px' }} textAlign="center">
        {isMobile ? 'Tap/drag around' : 'Try moving around'}
      </Typography>
    </Box>
  )
}
