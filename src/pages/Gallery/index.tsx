import { keyframes, styled, Typography } from '@mui/material'
import Box from 'components/Box'
import Modal from 'components/Modal'
import { LIST_OF_WORKS } from 'constants/listOfWorks'
import { routes } from 'constants/routes'
import { useLocation, useNavigate } from 'react-router-dom'

const appear = keyframes`
0% {opacity: 0};
1% {opacity: 1};
40% {opacity: 0};
50% {opacity: 1};
90% {opacity: 1};
100% {opacity: 0};
`

const Title = styled('div')({
  fontSize: 30,
  fontWeight: 700
})
const Description = styled('div')({
  fontSize: 24,
  fontWeight: 700,
  maxWidth: 300
})

const Img = styled(Box)<{ delay: number }>(({ delay, theme }) => ({
  position: 'absolute',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
  userDelect: 'none',
  pointerEvents: 'none',
  transform: 'translate(0, 0)',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  animation: `${appear} 15s infinite`,
  animationDelay: delay + 's',
  opacity: 0,
  left: '50%',
  width: 640,
  height: 366,
  filter: 'saturate(0)',
  [theme.breakpoints.down('md')]: {
    width: 640,
    height: 366
  }
}))

export default function GalleryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Modal
      isOpen={location.pathname === routes.gallery}
      onDismiss={() => {
        navigate(routes.home)
      }}
    >
      <Box
        sx={{ color: '#ffffff', fontWeight: 900, '& p': { fontWeight: 900 } }}
        padding="60px 20px"
        display="grid"
        justifyItems={'center'}
        gap={60}
      >
        <Typography fontSize={60}>Gallery</Typography>
        <GalleryContent color="#ffffff" />
      </Box>
    </Modal>
  )
}

export function GalleryContent({ color = '#000000' }: { color?: string }) {
  return (
    <Box
      display="grid"
      gap={'40px'}
      justifyItems="center"
      sx={{
        '& p, div': {
          // fontSize: 28
        },
        '& a': {
          color: color,
          // fontSize: 35,
          '&:hover': {
            textShadow: '0 0 15px ' + color
          }
        }
      }}
    >
      <Typography component="div">
        {LIST_OF_WORKS.map(({ title, description, technology }) => {
          return (
            <Box key={title}>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <Typography>{technology}</Typography>
            </Box>
          )
        })}
      </Typography>
    </Box>
  )
}

export function GalleryContent2({ color = '#000000' }: { color?: string }) {
  return (
    <>
      {Array.from(Array(4).keys()).map(() => {
        return (
          <Box
            display="grid"
            gap={'40px'}
            justifyItems="center"
            sx={{
              '& p, div': {
                // fontSize: 28
              },
              '& a': {
                color: color
              },
              zIndex: 1000
            }}
          >
            <Typography component="div">
              {LIST_OF_WORKS.map(
                ({ title, description, technology, gif }, idx) => {
                  return (
                    <Box
                      key={title}
                      sx={{
                        '&:hover': {
                          background: 'red'
                        },
                        overflow: 'visible',
                        position: 'relative'
                      }}
                    >
                      <Typography
                        fontSize={60}
                        fontWeight={700}
                        sx={{
                          marginLeft: Math.random() * 70 + '%',
                          mixBlendMode: 'exclusion'
                        }}
                      >
                        {title}
                      </Typography>
                      {gif && (
                        <Img
                          delay={idx + idx * Math.random() * 2}
                          sx={{
                            zindex: -1,
                            background: `no-repeat  center/cover url(${gif})`,
                            left: Math.random() * 50 + '%'
                          }}
                        />
                      )}
                      {/* <Description>{description}</Description>
            <Typography>{technology}</Typography> */}
                    </Box>
                  )
                }
              )}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}
