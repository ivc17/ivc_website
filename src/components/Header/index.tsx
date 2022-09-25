import { Button, styled, useTheme } from '@mui/material'
import Box from 'components/Box'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import { ReactComponent as Icon } from 'assets/svg/icon.svg'
import TextCarousel from './TextCarousel'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useBreakpoint from 'hooks/useBreakpoints'

const StyledNav = styled('nav')(({ theme }) => ({
  transition: '.5s',
  willChange: 'transform',
  background: '#000000',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transformOrigin: 'center center',
  '& button': {
    '&:hover, :active': {
      background: 'transparent',
      transform: 'scale(1.5,1.5) '
    }
  },
  height: 60,
  gap: 5,
  padding: '10px 20px 0 0',
  fontSize: 14,
  [theme.breakpoints.up('md')]: {
    height: 100,
    gap: 30,
    padding: '0 60px',
    fontSize: 18
  }
}))

const carouselText = [
  'FrontendDevelopment',
  'Ui/UxDesign',
  'GraphicDesign',
  'FineArt'
]

export default function Header() {
  const navigate = useNavigate()
  const isDownMd = useBreakpoint('md')
  const isDownSm = useBreakpoint('sm')
  const theme = useTheme()

  return (
    <Box
      position="fixed"
      top={'0'}
      left={'0'}
      width="100%"
      zIndex={theme.zIndex.modal + 1}
    >
      <Box position="relative">
        <Box
          sx={{
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            '& button': {
              whiteSpace: 'nowrap'
            }
          }}
          width="100%"
          // height="35px"
          paddingLeft={{ xs: 20, md: 35 }}
          display="flex"
        >
          <StyledNav>
            <Button
              sx={{
                transition: '.5s',
                width: { xs: '60px', md: '150px' },
                background: '#000000'
              }}
              onClick={() => {
                navigate('/')
              }}
            >
              {isDownSm ? (
                <Icon />
              ) : (
                <Logo style={{ width: '100%', strokeWidth: 5 }} />
              )}
            </Button>

            <Button
              onClick={() => {
                navigate(routes.about)
              }}
              sx={{
                color: '#ffffff',
                fontWeight: 700
              }}
              variant="text"
            >
              About
            </Button>
            <Button
              onClick={() => {
                navigate('/gallery')
              }}
              sx={{
                color: '#ffffff',
                fontWeight: 700
              }}
            >
              GALLEY
            </Button>
            <Button
              onClick={() => {
                navigate('/contact')
              }}
              sx={{
                color: '#ffffff',
                fontWeight: 700
              }}
            >
              Contact
            </Button>
          </StyledNav>
          <Box
            flexGrow={1}
            overflow={isDownMd ? 'visible' : 'hidden'}
            position="relative"
            sx={{ background: '#000000', height: { xs: 20, md: 35 } }}
          >
            <TextCarousel
              textList={carouselText}
              orientation="horizontal"
              duration={30}
            />
          </Box>
        </Box>

        <Box
          width={{ xs: 20, md: 35 }}
          height="100%"
          minHeight={'100vh'}
          top={0}
          left={0}
          sx={{
            background: '#ffffff',
            writingMode: 'vertical-rl',
            position: 'absolute'
          }}
        >
          <TextCarousel textList={carouselText} orientation="vertical" />
        </Box>
      </Box>
    </Box>
  )
}
