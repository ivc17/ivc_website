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

      <img
        style={{ marginTop: -6 }}
        src={'https://www.dropbox.com/s/bsqzgcgcp9x5afc/asf2y-4.png?raw=1'}
        alt=""
      />
      {'\n\n'}
      <Box
        display="grid"
        width="100%"
        gridTemplateColumns={'50% 50%'}
        sx={{ '& img': { width: '100%', objectFit: 'contain' } }}
        className="half"
      >
        <img
          style={{ marginTop: -6 }}
          src={'https://www.dropbox.com/s/9r5elu5zhdpykdy/asf2y-f1.png?raw=1'}
          alt=""
        />
        <img
          style={{ marginTop: -6 }}
          src={'https://www.dropbox.com/s/9lay4403c6f1mlu/asf2y-f2.gif?raw=1'}
          alt=""
        />
      </Box>
    </>
  )
}
