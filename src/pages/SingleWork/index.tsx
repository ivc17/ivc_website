import { styled, Typography } from '@mui/material'
import Box from 'components/Box'
import Copy from 'components/Copy'
import ExternalLink from 'components/ExternalLink'
import Modal from 'components/Modal'
import { LIST_OF_WORKS } from 'constants/listOfWorks'
import { routes } from 'constants/routes'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Capsule = styled('div')(({ theme }) => ({
  border: '1px solid #000000',
  background: '#ffffff',
  fontSize: 28,
  padding: '10px 20px',
  maxWidth: 500,
  marginTop: -1,
  '&:nth-of-type(1)': {
    marginTop: 0
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
    padding: '8px 20px'
  }
}))
export default function SingleWork() {
  const { pathname } = useLocation()
  const match = useMemo(() => pathname.match(/\/gallery\/(.*)/), [pathname])

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
      {!work && match && (
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
        <Box
          sx={{
            fontWeight: 900 + '!important',
            '& h1, .p': {
              fontWeight: 900,
              background: '#ffffff',
              border: '1px solid #000000'
            }
          }}
        >
          <Typography
            fontSize={{ xs: 30, sm: 40, md: 60 }}
            component="h1"
            fontWeight={900}
            sx={{
              padding: '10px 20px'
            }}
          >
            {work.title}
          </Typography>
          {work.link && (
            <Typography
              className="p"
              display={'flex'}
              alignItems="center"
              gap={20}
              maxWidth="max-content"
              padding="10px 20px"
              mt={-1}
              fontSize={{ xs: 24, md: 40 }}
            >
              <ExternalLink href={work.link}>Launch</ExternalLink>
              <Copy toCopy={work.link} />
            </Typography>
          )}
          <Typography
            mt={-1}
            fontSize={{ xs: 16, md: 24 }}
            className="p"
            sx={{
              padding: { xs: '10px 20px 40px', md: '40px' }
            }}
          >
            {work.description}
          </Typography>
          <Box position="relative" mt={100}>
            <Typography
              component={'div'}
              className="p"
              fontSize={{ xs: 24, md: 40 }}
              position="absolute"
              top={{ xs: '-46px', md: '-60px' }}
              width="max-content"
              padding="10px 20px"
            >
              MAIN Technologies:
            </Typography>
            {work.technology.split(', ').map((word) => (
              <Capsule key={word}>{word}</Capsule>
            ))}
          </Box>
        </Box>
      )}
    </Modal>
  )
}
