import { Button } from '@mui/material'
import Box from 'components/Box'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import TextCarousel from './TextCarousel'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useBreakpoint from 'hooks/useBreakpoints'

const carouselText = [
  'FrontendDevelopment',
  'Ui/UxDesign',
  'GraphicDesign',
  'FineArt'
]

// const StyledButton = styled(Button)({
//   display: 'block',
//   justifyContent: 'flex-start',
//   fontSize: 40,
//   // userSelect: 'none',
//   '&:hover': {
//     background: '#ffffff',
//     width: '100%',
//     color: '#000000',
//     transition: '0.5s'
//   }
// })

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isDownMd = useBreakpoint()

  return (
    <Box position="fixed" top={'0'} left={'0'} width="100%" zIndex={10}>
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
          paddingLeft={'35px'}
          display="flex"
        >
          <Box
            padding={{ xs: '0 20px', md: '0 80px' }}
            display={'flex'}
            alignItems="center"
            gap={{ xs: 10, md: 30 }}
            height={{ xs: 80, md: 100 }}
            zIndex={5}
            sx={{
              background: '#000000',
              position: 'relative',
              fontSize: { xs: 14, md: 18 }
            }}
          >
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
              All work
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
            <Box
              width={'100%'}
              position="absolute"
              top={{ xs: 100, md: 120 }}
              left={0}
            >
              <Button
                sx={{
                  pointerEvents: pathname === '/' ? 'none' : 'auto',
                  transition: '.5s',
                  opacity: pathname === '/' ? 0 : 1,
                  width: { xs: '100px', md: '70%' },
                  background: '#000000'
                }}
                onClick={() => {
                  navigate('/')
                }}
              >
                <Logo style={{ width: '100%', strokeWidth: 5 }} />
              </Button>

              {/* <StyledButton>Fine Art</StyledButton>
          <StyledButton>Web</StyledButton>
          <StyledButton>Graphic Design</StyledButton>
          <StyledButton>Photography</StyledButton> */}
            </Box>
          </Box>
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
          mt="-40px"
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
