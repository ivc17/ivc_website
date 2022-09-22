import { Typography } from '@mui/material'
import Box from 'components/Box'
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
        gap={90}
      >
        <Typography fontSize={60}>Contact</Typography>
        <Box
          display="grid"
          gap={40}
          sx={{
            '& p': {
              fontSize: 20
            }
          }}
        >
          <Typography>
            {' '}
            email:
            <br />
            ivc1741@gmail.com{' '}
          </Typography>
          <Typography>
            github: <br /> ivc17
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}
