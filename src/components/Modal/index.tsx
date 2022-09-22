import { Dialog } from '@mui/material'

export default function Modal({
  isOpen,
  onDismiss,
  children
}: {
  isOpen: boolean
  onDismiss: () => void
  children: React.ReactNode
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
        width: '100%'
      }}
      PaperProps={{
        sx: {
          background: `#ffffff50`,
          width: {
            xs: '100%',
            sm: '100%'
          },
          margin: { xs: 20, md: '40px' },
          maxWidth: 'unset',
          height: '80vh',
          minHeight: 400
        }
      }}
    >
      {children}
    </Dialog>
  )
}
