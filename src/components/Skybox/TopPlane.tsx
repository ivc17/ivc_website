import { useEffect, useRef } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {} from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, Scene } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from 'utils/setPlaneProps'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import { GalleryContent } from 'pages/Gallery'
import { AnimatedBox } from './AnimatedBox'

const textContent = ReactDOMServer.renderToString(<GalleryContent />)

export default function TopPlane({
  setPlane,
  cssScene
}: {
  setPlane: SetPlane
  cssScene: Scene
}) {
  const ref = useRef<Mesh>()
  const cssRef = useRef<CSS3DObject>()

  useEffect(() => {
    const { height, width } = getPlaneArg()

    const str = ReactDOMServer.renderToString(<Top />)

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
    setPlaneProps('top', ref.current, setPlane, cssRef.current)
  }, [cssScene, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={true}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

function Top() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end'
      }}
    >
      <AnimatedBox>
        <Typography textAlign={'center'} fontSize={'28px'}>
          <div
            dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
            style={{
              height: 'max-content'
            }}
          />
        </Typography>
        <Typography textAlign={'center'} fontSize={'28px'}>
          <div
            dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
            style={{
              height: 'max-content'
            }}
          />
        </Typography>
        <Typography textAlign={'center'} fontSize={'28px'}>
          <div
            dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
            style={{
              height: 'max-content'
            }}
          />
        </Typography>
        <Typography textAlign={'center'} fontSize={'28px'}>
          <div
            dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
            style={{
              height: 'max-content'
            }}
          />
        </Typography>
      </AnimatedBox>
    </div>
  )
}
