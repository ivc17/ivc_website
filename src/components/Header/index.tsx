import { Button } from '@mui/material'
import Box from 'components/Box'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import TextCarousel from './TextCarousel'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

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

  return (
    <Box position="fixed" top={'0'} left={'0'} width="100%">
      <Box position="relative">
        <Box
          sx={{
            background: '#000000',
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            '& button': {
              whiteSpace: 'nowrap'
            }
          }}
          width="100%"
          height="35px"
          paddingLeft={'35px'}
          display="flex"
        >
          <Box
            padding="0 80px"
            display={'flex'}
            alignItems="center"
            gap={30}
            height={100}
            zIndex={5}
            sx={{
              background: '#000000'
            }}
          >
            <Button
              onClick={() => {
                navigate(routes.about)
              }}
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                width: 100,
                fontSize: 20
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
                fontWeight: 700,
                width: 100,
                fontSize: 20
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
                fontWeight: 700,
                width: 100,
                fontSize: 20
              }}
            >
              Contact
            </Button>
          </Box>
          <Box flexGrow={1} overflow="hidden" position="relative">
            <TextCarousel
              textList={carouselText}
              orientation="horizontal"
              duration={30}
            />
          </Box>
        </Box>

        <Box
          width="35px"
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
        <Box padding={'60px 0 0 80px'}>
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            {' '}
            <Logo style={{ minHeight: '100px', height: '5vh' }} />
          </Button>

          {/* <StyledButton>Fine Art</StyledButton>
          <StyledButton>Web</StyledButton>
          <StyledButton>Graphic Design</StyledButton>
          <StyledButton>Photography</StyledButton> */}
        </Box>
      </Box>
    </Box>
  )
}
