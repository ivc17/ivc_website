import { Typography } from '@mui/material'
import Box from 'components/Box'
import Copy from 'components/Copy'
import ExternalLink from 'components/ExternalLink'
import Modal from 'components/Modal'
import { routes } from 'constants/routes'
import useBreakpoint from 'hooks/useBreakpoints'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ContactPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDownSm = useBreakpoint('sm')
  return (
    <Modal
      isOpen={location.pathname === routes.contact}
      onDismiss={() => {
        navigate(routes.home)
      }}
      height={isDownSm ? undefined : '80vh'}
    >
      <Box
        sx={{
          margin: '0 auto',
          fontWeight: 900,
          '& p, .p': {
            fontWeight: 900,
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px 20px',
            width: 'max-content'
          }
        }}
        padding={{ xs: '40px 10px 200px', md: '60px 20px 200px' }}
        display="grid"
        justifyItems={'flex-start'}
        gap={{ xs: '60px', md: '90px' }}
      >
        <Typography fontSize={{ xs: 40, md: 60 }}>CONTACT</Typography>
        <Box
          display="grid"
          gap={{ xs: 35, md: 40 }}
          sx={{
            '& p, .p': {
              fontSize: { xs: 18, md: 30 }
            },
            '& *': {
              textOverflow: 'break-all'
            }
          }}
          maxWidth={700}
        >
          <Box>
            <Typography mb={5}>EMAIL:</Typography>
            <Typography
              display={'inline-flex'}
              gap={10}
              alignItems="center"
              component={'div'}
              className="p"
            >
              ivc1741@gmail.com
              <Copy toCopy="ivc1741@gmail.com" />
            </Typography>
          </Box>
          <Box display={'inline-flex'} gap={5} alignItems="center">
            <Typography> GITHUB:</Typography>
            <Typography display={'inline-flex'} gap={10} alignItems="center">
              <ExternalLink href="https://github.com/ivc17" underline="always">
                ivc17
              </ExternalLink>
            </Typography>
          </Box>
          <Box>
            <Typography mb={5}> WEBSITE:</Typography>
            <Typography
              display={'inline-flex'}
              gap={10}
              alignItems="center"
              component={'div'}
              className="p"
            >
              <ExternalLink href="https://ivc17.github.io/" underline="always">
                https://ivc17.github.io/
              </ExternalLink>
              <Copy toCopy="https://ivc17.github.io/" />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
