import { styled, Typography } from '@mui/material'
import BackButton from 'components/BackButton'
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
      <BackButton to={routes.gallery} />
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
              fontSize: { xs: 24, md: 60 }
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
            width: '100%',
            margin: { xs: '0 auto', md: '60px auto 0' },
            fontWeight: 900 + '!important',
            maxWidth: (theme) => theme.width.maxContent,
            '& h1, .p': {
              fontWeight: 900,
              background: '#ffffff',
              border: '1px solid #000000'
            },
            '& .button': {
              transition: '.5s',
              '&:hover': {
                '& *': {
                  color: '#ffffff'
                },
                color: '#ffffff',
                background: '#000000'
              }
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
              className="p button"
              display={'flex'}
              alignItems="center"
              gap={20}
              maxWidth="max-content"
              padding="10px 20px"
              mt={-1}
              fontSize={{ xs: 24, md: 40 }}
              component="div"
            >
              <ExternalLink href={work.link}>Launch</ExternalLink>
              <Copy toCopy={work.link} />
            </Typography>
          )}
          <Typography
            component="div"
            mt={-1}
            fontSize={{ xs: 16, md: 24 }}
            className="p"
            sx={{
              padding: 0,
              whiteSpace: 'pre-wrap',
              '& video, img': {
                width: '100%',
                mt: 20,
                background: `#000000`,
                height: { xs: 200, sm: 324, md: 486, lg: 648, xl: 775 },
                objectFit: 'cover'
              },
              '& .half video,.half img': {
                width: '100%',
                mt: 20,
                background: `#000000`,
                height: { xs: 100, sm: 162, md: 243, lg: 328, xl: 387 },
                objectFit: 'cover'
              },
              '& .third video,.third img': {
                width: '100%',
                mt: 20,
                background: `#000000`,
                height: { xs: 66.7, sm: 108, md: 243, lg: 216, xl: 258.3 },
                objectFit: 'cover'
              },
              '& p': {
                padding: {
                  xs: '0 20px',
                  md: '0 40px'
                }
              }
            }}
          >
            {work.description}
          </Typography>

          {work.link && (
            <Typography
              className="p button"
              display={'flex'}
              alignItems="center"
              gap={20}
              // maxWidth="max-content"
              padding="20px 20px"
              mt={40}
              fontSize={{ xs: 24, md: 40 }}
              component="div"
            >
              <ExternalLink href={work.link} sx={{ margin: '0 auto' }}>
                Launch
              </ExternalLink>
            </Typography>
          )}
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
          <div style={{ height: 300 }}></div>
        </Box>
      )}
    </Modal>
  )
}
