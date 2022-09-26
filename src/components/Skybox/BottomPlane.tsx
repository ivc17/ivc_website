import { useEffect, useRef } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Mesh, Scene } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from 'utils/setPlaneProps'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import { AnimatedBox2 } from './AnimatedBox'
import { LIST_OF_WORKS } from 'constants/listOfWorks'

const textContent = LIST_OF_WORKS.reduce((acc, { hashtag, technology }) => {
  if (!hashtag) return acc
  acc +=
    '#' +
    hashtag.split(', ').join('\xa0\xa0\xa0#') +
    '\xa0\xa0\xa0#' +
    technology.split(', ').join('\xa0\xa0\xa0#') +
    '\xa0\xa0\xa0'
  return acc
}, '#FrontEnd #CreativeCoding #UI/UX')

export default function BottomPlane({
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

    const str = ReactDOMServer.renderToString(<Bottom />)

    const element = document.createElement('div')
    element.innerHTML = str
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.boxSizing = 'border-box'

    var obj = new CSS3DObject(element)
    cssRef.current = obj
    cssScene.add(cssRef.current)
  }, [cssScene])

  useEffect(() => {
    setPlaneProps('bottom', ref.current, setPlane, cssRef.current, isDownMd)
  }, [cssScene, setPlane, isDownMd])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function Bottom() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start'
      }}
    >
      <AnimatedBox2>
        <Typography
          textAlign={'center'}
          fontSize={'28px'}
          fontWeight={700}
          maxWidth="100%"
          sx={{ wordBreak: 'break-word' }}
        >
          {textContent}
          {textContent}
          {textContent}
          {textContent}
        </Typography>
      </AnimatedBox2>
    </div>
  )
}
