import { useMemo, useRef } from 'react'
import typeUrl from 'assets/img/type.png'
import { keyframes } from '@emotion/react'
import { styled } from '@mui/material'

const move = keyframes`
	from {transform: rotateY(10deg) rotateZ(5deg)};
	to {transform: rotateY(-10deg) rotateZ(-5deg)};
`

const StyledImg = styled('img')({
  perspective: '500px',
  animation: `${move} 5s infinite alternate linear`
})

export default function ChrometypeMobile({
  setLoaderProgress,
  finishLoading,
  pathname
}: {
  pathname: string
  finishLoading: boolean
  setLoaderProgress: (current: number, total: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const display = useMemo(() => {
    if (pathname === '/' && finishLoading) {
      return 'block'
    }
    return 'none'
  }, [pathname, finishLoading])

  // useEffect(() => {
  //   const func = (e: MouseEvent) => {
  //     if (!ref.current) return
  //     if (e.pageY > window.innerHeight / 2) {
  //       ref.current.style.transform = 'translate(0,-70%) rotateX(5deg)'
  //     } else {
  //       ref.current.style.transform = 'translate(0,-30%) rotateX(-5deg)'
  //     }
  //   }

  //   window.addEventListener('mousemove', func)
  // }, [])

  return (
    <div
      ref={ref}
      style={{
        perspective: '500px',
        display: display,
        position: 'fixed',
        top: '50%',
        left: '20px',
        height: 'max-content',
        width: '100vw',
        zIndex: 9999,
        transform: 'translate(0,-50%)',
        transition: '1s'
      }}
    >
      <StyledImg
        src={typeUrl}
        onLoad={() => setLoaderProgress(1, 1)}
        alt="IVC17"
        style={{ width: '100%', display: display }}
      />
    </div>
  )
}
