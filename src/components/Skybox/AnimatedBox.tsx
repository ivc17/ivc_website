import { styled } from '@mui/material'

export const AnimatedBox = styled('div')<{ direction?: 'upward' | 'downward' }>(
  ({ direction }) => ({
    '@keyframes animatedBox': {
      from: {
        transform: 'translateY(0%)'
      },
      to: {
        transform: 'translateY(-50%)'
      }
    },
    animation: 'animatedBox 20s infinite linear',
    animationDirection: direction === 'downward' ? 'reverse' : 'inherit',
    position: 'absolute'
  })
)

export const AnimatedBox2 = styled('div')<{
  direction?: 'upward' | 'downward'
}>(({ direction }) => ({
  '@keyframes animatedBox2': {
    from: {
      transform: 'translateY(0%)'
    },
    to: {
      transform: 'translateY(-25%)'
    }
  },
  animation: 'animatedBox2 10s infinite linear',
  animationDirection: direction === 'downward' ? 'reverse' : 'inherit',
  position: 'absolute'
}))
