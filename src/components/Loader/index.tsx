import Box from 'components/Box'
import { Html } from '@react-three/drei'
import { CircularProgress } from '@mui/material'

export default function Loader() {
  return (
    <Html center>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="center"
        position="relative"
      >
        <CircularProgress size={170} sx={{ color: '#000000' }} />
        <Box
          position={'absolute'}
          sx={{
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            fontWeight: 900,
            fontSize: '35px',
            color: '#000000'
          }}
        >
          LOADING
        </Box>
      </Box>
    </Html>
  )
}
