import Box from 'components/Box'

export default function WhiteNoise() {
  return (
    <>
      <p>
        Explore image possibility’s with only grayscale colors. An react three
        fiber based experiment to test out object manipulation with react
        mechanism. Also explores noise, curve, shaders and other techniques.
      </p>
      <video muted playsInline loop autoPlay>
        <source
          src={
            'https://www.dropbox.com/s/5mnxzir1g34paqe/white_noise1.mp4?raw=1'
          }
          type="video/mp4"
        />
      </video>
      {'\n\n'}
      <video muted playsInline loop autoPlay>
        <source
          src={
            'https://www.dropbox.com/s/apt5fv3u53msl7l/white_noise2.mp4?raw=1'
          }
          type="video/mp4"
        />
      </video>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          '& video': {
            width: '80%',
            maxWidth: '400px',
            height: 'auto',
            minHeight: 300,
            margin: '40px auto 100px'
          }
        }}
      >
        <video muted playsInline loop autoPlay>
          <source
            src={
              'https://www.dropbox.com/s/od7vukl5yrcylqm/white_noise3.mp4?raw=1'
            }
            type="video/mp4"
          />
        </video>
      </Box>
    </>
  )
}
