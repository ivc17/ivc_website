import { styled, Typography } from '@mui/material'
import Box from 'components/Box'
import Modal from 'components/Modal'
import { LIST_OF_WORKS } from 'constants/listOfWorks'
import { routes } from 'constants/routes'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Capsule = styled('div')({
  border: '1px solid #000000',
  background: '#ffffff',
  fontSize: 28
})
export default function SingleWork() {
  const { pathname } = useLocation()
  const match = pathname.match(/\/gallery\/(.+)/)

  const work = useMemo(() => {
    if (!match) return undefined
    const item = LIST_OF_WORKS.find(({ param }) => param === match[1])
    return item
  }, [match])

  return (
    <Modal
      isOpen={!!match}
      onDismiss={() => {}}
      height={work ? undefined : '80vh'}
    >
      {!work && (
        <Box
          display="flex"
          justifyContent={'center'}
          flexDirection="column"
          alignItems={'center'}
          gap={20}
          sx={{
            '& p': {
              fontWeight: 900,
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '10px 20px',
              width: 'max-content',
              fontSize: 60
            }
          }}
        >
          <Box
            width="200px"
            height="200px"
            sx={{
              borderRadius: '50%',
              border: '20px solid #000000',
              fontSize: '170px',
              fontWeight: 900,
              color: '#000000',
              background: '#ffffff'
            }}
            display="flex"
            alignItems={'center'}
            justifyContent="center"
          >
            !
          </Box>
          <Typography> Project does not exist</Typography>
          <Typography mt={20}>
            <Link to={routes.gallery} style={{ color: '#000000' }}>
              Checkout other projects
            </Link>
          </Typography>
        </Box>
      )}
      {work && (
        <Box>
          <Typography fontSize={{ xs: 40, md: 60 }}>{work.title}</Typography>
          <Typography fontSize={{ xs: 20, md: 40 }}>
            {work.description}
          </Typography>
          <Box>
            {work.technology.split(', ').map((word) => (
              <Capsule key={word}>{word}</Capsule>
            ))}
          </Box>
        </Box>
      )}
    </Modal>
  )
}
