import { styled } from '@mui/material'

export const AnimatedBox = styled('div')<{ direction?: 'upward' | 'downward' }>(
  ({ direction }) => ({
    '@keyframes animatedBox': {
      from: {
        transform: 'translateY(-25%)'
      },
      to: {
        transform: 'translateY(-50%)'
      }
    },
    animation: 'animatedBox 10s infinite linear',
    animationDirection: direction === 'downward' ? 'reverse' : 'inherit',
    position: 'absolute'
  })
)
