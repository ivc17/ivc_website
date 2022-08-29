import { Box } from '@mui/material'

export default function TextCarousel({
  textList,
  orientation = 'horizontal',
  duration = 20
}: {
  textList: string[]
  orientation: 'horizontal' | 'vertical'
  duration?: number
}) {
  return (
    <Box
      component="div"
      position="absolute"
      top={'50%'}
      left={0}
      zIndex={(theme) => theme.zIndex.modal}
      sx={{
        transform: 'translateY(-50%)',
        '& span': {
          fontWeight: 900,
          fontSize: 27
        }
      }}
    >
      <Box
        component="div"
        display="flex"
        alignItems={'center'}
        sx={{
          animation: `${
            orientation === 'horizontal' ? 'loop' : 'loopVertical'
          } ${duration * 1000}ms infinite linear`,
          '@keyframes loop': {
            '0%': {
              transform: 'translateX(0%)'
            },
            '100%': {
              transform: 'translateX(-50%)'
            }
          },
          '@keyframes loopVertical': {
            '0%': {
              transform: 'translateY(0%)'
            },
            '100%': {
              transform: 'translateY(25%)'
            }
          }
        }}
      >
        {Array.from(Array(10).keys()).map((num, idx) => {
          return (
            <div key={num + idx}>
              {textList.map((text, idx) => (
                <span key={text + idx}>{text}&nbsp;.&nbsp;</span>
              ))}
            </div>
          )
        })}
      </Box>
    </Box>
  )
}
