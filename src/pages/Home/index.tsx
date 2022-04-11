import { Box } from '@mui/material'
import Frame from 'components/Frame'

export default function Home() {
  return (
    <Box>
      <Box
        position="fixed"
        top={'20vh'}
        left={'0'}
        width="100vw"
        height="80vh"
        zIndex="-1"
        sx={{ pointerEvents: 'none' }}
      >
        <Frame />
      </Box>
    </Box>
  )
}
