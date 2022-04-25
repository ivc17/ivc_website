import { Button, styled } from '@mui/material'
import Box from 'components/Box'
import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import TextCarousel from './TextCarousel'

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
          paddingLeft={'100px'}
          display="flex"
        >
          <Button>About</Button>
          <Button>All work</Button>
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
          <Logo style={{ minHeight: '100px', height: '10vh' }} />
          {/* <StyledButton>Fine Art</StyledButton>
          <StyledButton>Web</StyledButton>
          <StyledButton>Graphic Design</StyledButton>
          <StyledButton>Photography</StyledButton> */}
        </Box>
      </Box>
    </Box>
  )
}
