import {
  Button,
  keyframes,
  styled,
  Typography,
  Dialog,
  useTheme
} from '@mui/material'
import Box from 'components/Box'
// import Modal from 'components/Modal'
import { LIST_OF_WORKS } from 'constants/listOfWorks'
import { routes } from 'constants/routes'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const textAlign = ['center', 'left', 'right']

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
const Tag = styled('div')({
  fontSize: 24,
  fontWeight: 500,
  maxWidth: 300
})

const Img = styled(Box)<{ delay: number }>(({ delay, theme }) => ({
  position: 'absolute',
  userDelect: 'none',
  pointerEvents: 'none',
  transform: 'translate(0, 0)',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  animation: `${appear} 15s infinite`,
  animationDelay: delay + 's',
  opacity: 0,
  left: '50%',
  top: '-50%',
  width: 480,
  height: 274,
  filter: 'saturate(0)'
}))

export default function GalleryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    // <Modal
    //   isOpen={location.pathname === routes.gallery}
    //   onDismiss={() => {
    //     navigate(routes.home)
    //   }}
    // >
    <Dialog
      open={location.pathname === routes.gallery}
      onClose={() => {
        navigate(routes.home)
      }}
      BackdropProps={{ sx: { background: 'transparent' } }}
      PaperProps={{
        sx: {
          minHeight: 'unset',
          maxWidth: '100%',
          background: 'transparent',
          boxShadow: 'none',
          width: '100%',
          maxHeight: '100%',
          margin: 0,
          marginLeft: { xs: '20px', md: '35px' },
          paddingTop: {
            xs: theme.height.mobileHeader,
            md: theme.height.header
          }
        }
      }}
    >
      <Box
        width="100%"
        padding={{ xs: '40px 0 100px', md: '60px 20px 200px' }}
        display={location.pathname === routes.gallery ? 'grid' : 'none'}
        justifyItems={'center'}
        gap={{ xs: 40, md: 60 }}
      >
        <Box>
          <Typography fontSize={'13vw'} fontWeight={900} color="#000000">
            GALLEY
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '100%', sm: '33.33% 33.33% 33.33%' }}
          maxWidth={theme.width.maxContent}
          rowGap={{ xs: 20, sm: 0 }}
          columnGap={{ xs: 20, sm: 0 }}
          sx={{
            '&>div': {
              marginTop: { xs: 0, sm: -1 },
              marginLeft: { xs: 0, sm: -1 }
            },
            '&>div:nth-of-type(-n+3)': {
              marginTop: 0
            },
            '&>div:nth-of-type(3n)': {
              marginLeft: 0
            }
          }}
        >
          {LIST_OF_WORKS.map(({ title, hashtag, param, gif }) => {
            const random = Math.round(Math.random() * 3)
            return (
              <React.Fragment key={title}>
                <Box
                  sx={{
                    boxShadow: '0 0 20px #00000010',
                    background: (theme) => theme.palette.background.paper,
                    border: '1px solid #000000',
                    '& img': {
                      width: '100%',
                      objectFit: 'contain'
                    },
                    width: { xs: '80%', sm: '100%' },
                    maxWidth: { xs: '80%', sm: '100%' }
                  }}
                  display="flex"
                  flexDirection={'column'}
                  justifySelf={{ xs: textAlign[random - 1], md: 'flex-start' }}
                >
                  {' '}
                  <img src={gif} alt={title} />
                  <Box padding="10px" mb={16}>
                    <Typography
                      fontSize={{ xs: 25, md: 30 }}
                      whiteSpace="break-spaces"
                      margin="8px 0 16px"
                      fontWeight={900}
                    >
                      {title}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      fontSize={{ xs: 14, md: 16 }}
                      display="flex"
                      flexWrap={'wrap'}
                    >
                      {hashtag?.split(', ').map((tag) => {
                        return <span key={tag}>#{tag}&nbsp;&nbsp;</span>
                      })}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      borderTop: '1px solid #000000',
                      marginTop: 'auto!important',
                      justifySelf: 'flex-end',
                      transition: '.5s',
                      '&:hover': {
                        color: '#ffffff',
                        background: '#000000'
                      }
                    }}
                    onClick={() => {
                      navigate(routes.singlWork.replace(':work', param))
                    }}
                  >
                    MORE
                  </Button>
                </Box>
                {Array.from(Array(random).keys()).map((_, idx) => (
                  <div key={idx} />
                ))}
              </React.Fragment>
            )
          })}
        </Box>
      </Box>
    </Dialog>
  )
}

export function GalleryContent({ color = '#000000' }: { color?: string }) {
  return (
    <Box
      display="grid"
      gap={'40px'}
      justifyItems="center"
      gridTemplateColumns={'1fr 1fr 1fr'}
      sx={{
        '& p, div': {
          maxWidth: '100%',
          wordBreak: 'break-all'
        },
        '& a': {
          color: color,
          '&:hover': {
            textShadow: '0 0 15px ' + color
          }
        }
      }}
    >
      {LIST_OF_WORKS.map(({ title, hashtag, technology, link }) => {
        return (
          <Box key={title}>
            <Title>{title}</Title>
            <Description>{hashtag}</Description>
            <Description>{link}</Description>
            <Tag>{technology}</Tag>
          </Box>
        )
      })}
    </Box>
  )
}

export function GalleryContent2({ color = '#000000' }: { color?: string }) {
  return (
    <>
      {Array.from(Array(2).keys()).map((_, idx) => {
        return (
          <Box
            key={idx}
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
                  const random = Math.abs(Math.round(Math.random() * 3 - 1))
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
                        textAlign={textAlign[random] as any}
                        sx={{
                          marginLeft: Math.random() * 70 + '%',
                          mixBlendMode: 'exclusion'
                        }}
                      >
                        {title}
                      </Typography>
                      {gif && (
                        <Img
                          delay={idx + idx * Math.random() * random}
                          sx={{
                            zindex: random,
                            background: `no-repeat  center/cover url(${gif})`,
                            left: Math.random() * 50 + '%'
                          }}
                        />
                      )}
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
