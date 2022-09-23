import { Dialog, useTheme } from '@mui/material'

export default function Modal({
  isOpen,
  onDismiss,
  children,
  maxWidth,
  height
}: {
  isOpen: boolean
  onDismiss: () => void
  children: React.ReactNode
  maxWidth?: number
  height?: string
}) {
  const theme = useTheme()
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
      BackdropProps={{
        sx: {
          backgroundColor: '#11111130'
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: 0,
          background: 'transparent',
          boxShadow: 'none',
          // `#22222299`,
          maxWidth: '100%',
          height: height ?? '100%',
          minHeight: 400,
          width: '100%',
          maxHeight: '100%',
          margin: 0,
          marginLeft: { xs: '20px', md: '35px' },
          paddingTop: {
            xs: theme.height.mobileHeader,
            md: theme.height.header
          }
        }
      }}
    >
      {children}
    </Dialog>
  )
}
