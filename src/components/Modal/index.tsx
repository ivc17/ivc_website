import { Dialog } from '@mui/material'

export default function Modal({
  isOpen,
  onDismiss,
  children,
  maxWidth
}: {
  isOpen: boolean
  onDismiss: () => void
  children: React.ReactNode
  maxWidth?: number
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onDismiss}
      sx={{
        '& *': {
          boxSizing: 'border-box'
        },
        '& .MuiDialog-container ': {
          width: '100%'
        },
        width: '100%',
        display: 'flex'
      }}
      BackdropProps={{ sx: { backgroundColor: '#11111130' } }}
      PaperProps={{
        sx: {
          borderRadius: 0,
          background: `#22222299`,
          width: {
            xs: '100%',
            sm: '100%'
          },
          margin: { xs: 20, md: '40px' },
          maxWidth: maxWidth ?? '1200px',
          height: '80vh',
          minHeight: 400
        }
      }}
    >
      {children}
    </Dialog>
  )
}
