import React from 'react'
import { ContentCopy } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import useCopyClipboard from 'hooks/useCopyClipboard'
import Box from 'components/Box'

interface Props {
  toCopy: string
  children?: React.ReactNode
}

export default function Copy(props: Props) {
  const [isCopied, setCopied] = useCopyClipboard()
  const { toCopy, children } = props

  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        height: 28
        // '& svg': {
        //   mr: '10px'
        // }
      }}
      onClick={(e) => {
        e.stopPropagation()
        setCopied(toCopy)
      }}
    >
      {isCopied ? (
        <CheckIcon sx={{ opacity: 0.6, fontSize: 28 }} />
      ) : (
        <ContentCopy sx={{ opacity: 0.6, fontSize: 28 }} />
      )}
      {children}
    </Box>
  )
}
