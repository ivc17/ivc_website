import Box from 'components/Box'

export default function Susi() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <p style={{ maxWidth: 800, margin: '40px auto 0px' }}>
        Official website for jewellery brand SUSISOMOS.
      </p>
      <video muted playsInline loop autoPlay>
        <source
          src={'https://www.dropbox.com/s/msi8qdjt8q97gl2/1.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
      {'\n\n'}
      <Box
        display="grid"
        width="100%"
        gridTemplateColumns={'50% 50%'}
        sx={{ '& img': { width: '100%', objectFit: 'contain' } }}
        className="half"
      >
        <video muted playsInline loop autoPlay>
          <source
            src={'https://www.dropbox.com/s/8mskehgt5x6cyxd/4.mp4?raw=1'}
            type="video/mp4"
          />
        </video>
        <video muted playsInline loop autoPlay>
          <source
            src={'https://www.dropbox.com/s/2wkq46w2vvtponc/5.mp4?raw=1'}
            type="video/mp4"
          />
        </video>
      </Box>
      <Box
        display="grid"
        width="100%"
        gridTemplateColumns={'50% 50%'}
        sx={{ '& img': { width: '100%', objectFit: 'contain' } }}
        className="half"
      >
        <video muted playsInline loop autoPlay>
          <source
            src={'https://www.dropbox.com/s/qaupidh3oo3bvme/2.mp4?raw=1'}
            type="video/mp4"
          />
        </video>
        <video muted playsInline loop autoPlay>
          <source
            src={'https://www.dropbox.com/s/k3kv1ye59c35nhm/3.mp4?raw=1'}
            type="video/mp4"
          />
        </video>
      </Box>
    </Box>
  )
}
