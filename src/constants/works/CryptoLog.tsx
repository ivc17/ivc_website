import Box from 'components/Box'

export default function CryptoLog() {
  return (
    <>
      <p>
        An experimental project that aims to test out the possibility of svg
        animation, as well as to what extent css mix-blend-mode is able to
        replicate layer effect in photoshop/illustrator.
      </p>
      <p>
        Also a place to document my journey navigating the web3 world. Updates
        irregurarly.
      </p>
      <video muted playsInline loop autoPlay>
        <source
          src={'https://www.dropbox.com/s/0ifihbbx143ilxx/csl-1.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
      {'\n\n'}
      <Box
        width="100%"
        sx={{
          '& img': {
            height: 'auto!important',
            margin: '0 auto',
            display: 'flex'
          }
        }}
      >
        <img
          style={{ width: '80%', maxWidth: 800 }}
          src={'https://www.dropbox.com/s/4uct11rus1tj09b/csl.png?raw=1'}
          alt=""
        />
      </Box>
      <video muted playsInline loop autoPlay>
        <source
          src={'https://www.dropbox.com/s/y19ddzthgc1u41w/csl-2.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
      <video muted playsInline loop autoPlay>
        <source
          src={'   https://www.dropbox.com/s/0ki5co6970h54jx/csl-3.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
    </>
  )
}
