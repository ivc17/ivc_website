import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Mesh, Scene } from 'three'
import { setPlaneProps } from 'utils/setPlaneProps'
import { getPlaneArg } from 'utils/getPlaneArgs'
import ReactDOMServer from 'react-dom/server'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { GalleryContent2 } from 'pages/Gallery'
import { AnimatedBox } from './AnimatedBox'
import Box from 'components/Box'

const textContent = ReactDOMServer.renderToString(<GalleryContent2 />)

export default function BackPlane({
  setPlane,
  cssScene,
  isDownMd
}: {
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
  cssScene: Scene
  isDownMd?: boolean
}) {
  const ref = useRef<Mesh>()
  const cssRef = useRef<CSS3DObject>()
  const { camera } = useThree()
  // const light = useRef<any>()

  useEffect(() => {
    // if (ref.current) {
    //   setPlaneProps('back', ref.current, setPlane)
    // }

    const { height, width } = getPlaneArg()

    const str = ReactDOMServer.renderToString(<Gallery />)

    const element = document.createElement('div')
    element.innerHTML = str
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.boxSizing = 'border-box'

    var obj = new CSS3DObject(element)
    cssRef.current = obj
    cssScene.add(obj)

    // const resize = debounce(() => {
    //   setPlaneProps('back', ref.current, undefined, cssRef.current)
    // }, 1000)
    // window.addEventListener('resize', resize)
  }, [setPlane, camera, cssScene])

  // useEffect(() => {
  //   cssRef.current?.position.setZ(isDownMd ? 0 : 2000)
  // }, [isDownMd])

  useEffect(() => {
    setPlaneProps('back', ref.current, setPlane, cssRef.current, isDownMd)
    // ref.current?.geometry.computeFaceNormals()
    // light.current.lookAt(ref.current?.position ?? [0, 0, 0])
  }, [cssScene, isDownMd, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function Gallery() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
          width: '100%'
        },
        '& .wrap': {
          width: '100%'
        }
      }}
    >
      <AnimatedBox>
        <div
          className={'wrap'}
          dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
          style={{
            height: 'max-content'
          }}
        />
        <div
          className={'wrap'}
          dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
          style={{
            height: 'max-content'
          }}
        />
        <div
          className={'wrap'}
          dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
          style={{
            height: 'max-content'
          }}
        />
        <div
          className={'wrap'}
          dangerouslySetInnerHTML={{ __html: textContent ?? '' }}
          style={{
            height: 'max-content'
          }}
        />
      </AnimatedBox>
    </Box>
  )
}
