import { Typography } from '@mui/material'
import Box from 'components/Box'
import ExternalLink from 'components/ExternalLink'
import Modal from 'components/Modal'
import { routes } from 'constants/routes'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ContactPage() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Modal
      isOpen={location.pathname === routes.contact}
      onDismiss={() => {
        navigate(routes.home)
      }}
    >
      <Box
        sx={{ color: '#ffffff', fontWeight: 900, '& p': { fontWeight: 900 } }}
        padding="60px 20px"
        display="grid"
        justifyItems={'center'}
        gap={'90px'}
      >
        <Typography fontSize={60}>CONTACT</Typography>
        <Box
          display="grid"
          gap={40}
          sx={{
            '& p': {
              fontSize: 30
            },
            '& span': {
              fontSize: 28
            }
          }}
          maxWidth={700}
        >
          <Typography>
            {' '}
            <span>EMAIL:</span>
            <br />
            ivc1741@gmail.com{' '}
          </Typography>
          <Typography>
            <span> GITHUB:</span> <br />{' '}
            <ExternalLink href="https://github.com/ivc17" underline="always">
              ivc17
            </ExternalLink>
          </Typography>

          <Typography>
            <span> WEBSITE:</span> <br />{' '}
            <ExternalLink href="https://ivc17.github.io/" underline="always">
              https://ivc17.github.io/
            </ExternalLink>
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}
