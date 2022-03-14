import { Box } from '@mui/material'
import Frame from 'components/Frame'

export default function Home() {
  return (
    <Box
      zIndex={-1}
      position="fixed"
      top={'20vh'}
      left={'0'}
      sx={{ height: '80vh', width: '100vw' }}
    >
      <Frame />
    </Box>
  )
}
