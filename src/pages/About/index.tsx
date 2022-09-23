import { styled, Typography } from '@mui/material'
import Box from 'components/Box'
import Modal from 'components/Modal'
import { routes } from 'constants/routes'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Capsule = styled('div')<{ color: string }>(({ theme, color }) => ({
  border: '1px solid ' + color,
  borderRadius: 60,
  width: 'max-content',
  padding: '3px 20px',
  maxWidth: '100%',
  fontSize: 28,
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
    padding: '3px 10px'
  }
}))

const keywords = [
  'Frontend/Web Development',
  'InteractiveDesign',
  'Motion Design',
  'GenerativeArt',
  'NFT',
  'Web3',
  'Music',
  'Tchaikovsky',
  'Techno',
  'PopCulture',
  'SpicyFood'
]

export default function AboutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Modal
      isOpen={location.pathname === routes.about}
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
        width="100%"
      >
        <Typography fontSize={60}>ABOUT ME</Typography>
        <AboutContent color="#ffffff" />
      </Box>
    </Modal>
  )
}

export function AboutContent({ color = '#000000' }: { color?: string }) {
  return (
    <>
      <Box
        className="grid"
        display="grid"
        gap={'40px'}
        justifyItems="center"
        sx={{
          maxWidth: '800px',
          '& p': {
            fontSize: 26
          },
          '& a': {
            color: color,
            fontSize: 35,
            '&:hover': {
              textShadow: '0 0 15px ' + color
            }
          }
        }}
      >
        <Typography>
          IVC17, a Taipei based creative web developer/designer who loves the
          digital space, and is all about being experimental and create crazy
          visuals in the virtual space.
          <br />
          <br />
          Experienced in both web2/web3 web with particular interest in NFTs.
          <br />
          <br />
          Mostly work with code but occasionally other mediums too. I’m always
          looking for next exciting project, drop me a message{' '}
          {color === '#ffffff' && <Link to={routes.contact}>here</Link>} If you’
          have any cool ideas that wants to be carried out.
        </Typography>
        <Typography textAlign={'left'} width="100%">
          I'm always intersted in these:
        </Typography>
        <Typography component="div" maxWidth="100%">
          <Box display="flex" flexWrap={'wrap'} gap="20px" className="capsules">
            {keywords.map((word) => (
              <Capsule color={color} key={word}>
                {word}
              </Capsule>
            ))}
          </Box>
        </Typography>
      </Box>
    </>
  )
}
