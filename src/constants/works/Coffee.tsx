export default function Coffee() {
  return (
    <>
      <p>
        Single page website based on SUSISOMOS AW2022 collection subset coffee
        break. A practice piece based on css animation.
      </p>
      <video muted playsInline loop autoPlay>
        <source
          src={'https://www.dropbox.com/s/zqbwvu9bqxmj2m7/coffee-1.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
      {'\n\n'}
      <video muted playsInline loop autoPlay>
        <source
          src={'https://www.dropbox.com/s/6jff3knsjq68to1/coffee-2.mp4?raw=1'}
          type="video/mp4"
        />
      </video>
    </>
  )
}
