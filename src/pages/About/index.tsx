import { styled, Typography } from '@mui/material'
import BackButton from 'components/BackButton'
import Box from 'components/Box'
import Modal from 'components/Modal'
import { routes } from 'constants/routes'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Capsule = styled('div')<{ color: string }>(({ theme, color }) => ({
  border: '1px solid ' + color,
  borderRadius: 60,
  width: 'max-content',
  padding: '6px 20px',
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
      <BackButton />
      <Box
        sx={{
          fontWeight: 900,
          '& div': { fontWeight: 900 },
          '& span, >p': {
            fontWeight: 900,
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px 20px',
            width: 'max-content',
            lineHeight: 2.3,
            fontSize: { xs: 18, md: 26 }
          },
          '& .capsule': {
            borderColor: '#000000',
            color: '#000000',
            background: '#ffffff',
            fontSize: { xs: 18, md: 28 },
            padding: { xs: '6px 10px', md: '6px 20px' }
          },
          '& .capsules': {
            mt: 20,
            gap: { xs: '10px', md: '20px' }
          },
          '& .grid': {
            width: '100%',
            '& div': {
              textAlign: 'left'
            }
          }
        }}
        padding={{ xs: '40px 10px 200px', md: '60px 20px 200px' }}
        display="grid"
        justifyContent={'center'}
        gap={60}
        width="100%"
      >
        <Typography
          component="h2"
          fontSize={{ xs: 40, md: 60 }}
          display="inline-block"
          fontWeight={900}
          sx={{
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px 20px',
            width: 'max-content'
          }}
        >
          ABOUT ME
        </Typography>
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
          '& div': {
            fontSize: 26,
            textAlign: 'right'
          },
          '& a': {
            color: (theme) => theme.palette.text.primary,
            fontSize: 35,
            '&:hover': {
              textShadow: '0 0 15px #00000050'
            }
          }
        }}
      >
        <Typography component={'div'}>
          <span>
            IVC17, a Taipei based creative web developer/designer who loves the
            digital space, and is all about being experimental and create crazy
            visuals in the virtual space.
          </span>
          <br />
          <br />
          <span>
            Experienced in both web2/web3 web with particular interest in NFTs.
          </span>
          <br />
          <br />
          <span>
            Mostly work with code but occasionally other mediums too. I’m always
            looking for next exciting project, drop me a message{' '}
            {color === '#ffffff' && <Link to={routes.contact}>here</Link>} if
            you’ have any cool ideas that wants to be carried out.
          </span>
        </Typography>
        <Box mt={'20px'}>
          <Typography textAlign={'right'} width="100%" component="div">
            <span>I'm always intersted in these:</span>
          </Typography>
          <Typography component="div" maxWidth="100%">
            <Box
              display="flex"
              flexWrap={'wrap'}
              gap="20px"
              className="capsules"
              mt="20px"
            >
              {keywords.map((word) => (
                <Capsule color={color} key={word} className="capsule">
                  {word}
                </Capsule>
              ))}
            </Box>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
