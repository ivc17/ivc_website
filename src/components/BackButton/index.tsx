import { Button } from '@mui/material'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => {
        navigate(routes.home)
      }}
      sx={{
        padding: '10px 20px',
        fontWeight: 900,
        fontSize: { xs: 18, md: 26 },
        width: '100px',
        color: '#ffffff',
        background: '#000000',
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
