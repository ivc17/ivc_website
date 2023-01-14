import Box from 'components/Box'

export default function WuNaiNull() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <p style={{ maxWidth: 800, margin: '40px auto 0px' }}>
        A character design practice. For practice purpose only.
      </p>
      <video muted playsInline loop autoPlay>
        <source
          src={
            'https://www.dropbox.com/s/y24wbwub3nw215o/wu-nai-null-1.mp4?raw=1'
          }
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
        <img
          style={{ marginTop: 0 }}
          src={
            'https://www.dropbox.com/s/ief2164b5znb0nt/wu-nai-null-1.png?raw=1'
          }
          alt=""
        />

        <img
          style={{ marginTop: 0 }}
          src={
            'https://www.dropbox.com/s/bevjb2dfp8fevl1/wu-nai-null-3.png?raw=1'
          }
          alt=""
        />
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
            src={
              'https://www.dropbox.com/s/8gxtu1h5rwivvwq/wu-nai-null-3.mp4?raw=1'
            }
            type="video/mp4"
          />
        </video>
        <video muted playsInline loop autoPlay>
          <source
            src={
              'https://www.dropbox.com/s/v8tw9iztn6pzm5j/wu-nai-null-4.mp4?raw=1'
            }
            type="video/mp4"
          />
        </video>
      </Box>
      <video muted playsInline loop autoPlay>
        <source
          src={
            'https://www.dropbox.com/s/5wcqx1483fyekys/wu-nai-null-2.mp4?raw=1'
          }
          type="video/mp4"
        />
      </video>{' '}
      {'\n\n'} {'\n\n'}
    </Box>
  )
}
