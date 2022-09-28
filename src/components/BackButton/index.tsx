import { Button } from '@mui/material'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }: { to?: string }) {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => {
        navigate(to ?? routes.home)
      }}
      sx={{
        padding: '10px 20px',
        fontWeight: 900,
        fontSize: { xs: 18, md: 26 },
        width: '100px',
        color: '#ffffff',
        background: '#000000',
        position: { xs: 'static', md: 'fixed' },
        height: 60,
        left: { xs: 20, md: 35 },
        zIndex: 10,
        top: (theme) => ({
          xs: theme.height.mobileHeader,
          md: theme.height.header
        }),
        '&:hover': {
          background: '#ffffff',
          color: '#000000'
        }
      }}
    >
      Back
    </Button>
  )
}
