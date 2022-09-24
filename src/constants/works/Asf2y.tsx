import Box from 'components/Box'

export default function Asf2y() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <p
        style={{
          fontSize: 24,
          color: '#ffffff',
          background: '#000000',
          paddingTop: 30,
          paddingBottom: 30,
          margin: 0
        }}
      >
        To gain full experience please headover by clicking launch.{'\n'}It is
        recommanded to scroll through it very slowly as if you're reading a
        book.
      </p>
      <img
        style={{ marginTop: 0 }}
        src={'https://www.dropbox.com/s/wm6xaocfsum2cph/asf2y.gif?raw=1'}
        alt=""
      />
      {'\n\n'}

      <p style={{ maxWidth: 870, margin: '40px auto 30px' }}>
        Story about after sleeping for two years underwater one(I) finally
        popped up, and saw how the sun shines on ocean surface.{'\n\n'}
      </p>
      <p style={{ maxWidth: 870, margin: '40px auto 30px' }}>
        It is to explore website being a creative medieum to tell a story and to
        provide an experience, but instead of flipping pages we have scrolling.
        {'\n'}
        It is also an attempt to deliver graphic layout with code, and
        animations.
      </p>
      {'\n\n'}
      <img
        style={{ marginTop: 0 }}
        src={'https://www.dropbox.com/s/3z75rjvczsb029h/asf2y-2.png?raw=1'}
        alt=""
      />
      <img
        style={{ marginTop: 0 }}
        src={'https://www.dropbox.com/s/ikj7bht1qh62jzg/asf2y-3.png?raw=1'}
        alt=""
      />
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

      <img
        style={{ marginBottom: -6 }}
        src={'https://www.dropbox.com/s/oxfgr2k98rs034p/asf2y-5.png?raw=1'}
        alt=""
      />
    </Box>
  )
}
