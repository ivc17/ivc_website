import { useEffect, useRef } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {} from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, Scene } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from 'utils/setPlaneProps'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import { AboutContent } from 'pages/About'
import Box from 'components/Box'
import { AnimatedBox2 } from './AnimatedBox'

const str = ReactDOMServer.renderToString(<AboutContent />)
const textContent = Array.from(Array(4).keys()).reduce((acc) => {
  acc += str + '<br/><br/>'
  return acc
}, '')

export default function AboutPlane({
  setPlane,
  cssScene,
  isDownMd
}: {
  setPlane: SetPlane
  cssScene: Scene
  isDownMd?: boolean
}) {
  const ref = useRef<Mesh>()
  const cssRef = useRef<CSS3DObject>()

  useEffect(() => {
    const { height, width } = getPlaneArg()

    const str = ReactDOMServer.renderToString(<About />)

    const element = document.createElement('div')
    element.innerHTML = str
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.boxSizing = 'border-box'

    var obj = new CSS3DObject(element)
    cssRef.current = obj
    cssScene.add(cssRef.current)

    // const resize = debounce(() => {
    //   setPlaneProps('left', ref.current, undefined, cssRef.current)
    // }, 1000)
    // window.addEventListener('resize', resize)
  }, [cssScene])

  useEffect(() => {
    setPlaneProps('left', ref.current, setPlane, cssRef.current, isDownMd)
  }, [cssScene, setPlane, isDownMd])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function About() {
  return (
    <Box
      id="about"
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '30%',
        '& p': {
          fontSize: 20,
          textAlign: 'right'
        },
        '& .grid': {
          gap: '20px',
          maxWidth: 'unset'
        },
        '& .capsules': {
          justifyContent: 'flex-end',
          '& div': {
            fontSize: 18,
            fontWeight: 700
          }
        }
      }}
    >
      <AnimatedBox2>
        <Typography
          component="div"
          textAlign={'center'}
          fontSize={'20px'}
          padding="0 20px"
          dangerouslySetInnerHTML={{
            __html: textContent ?? ''
          }}
        ></Typography>
      </AnimatedBox2>
    </Box>
  )
}
