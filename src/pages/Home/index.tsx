import Box from 'components/Box'
import Frame from 'components/Frame'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Box>
      <Box
        position="fixed"
        top={'0'}
        left={'0'}
        width="100vw"
        height="100vh"
        zIndex="-1"
        // sx={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Frame />
        </Suspense>
      </Box>
    </Box>
  )
}
