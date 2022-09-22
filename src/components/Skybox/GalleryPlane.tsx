import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Mesh, Scene } from 'three'
import { setPlaneProps } from 'utils/setPlaneProps'
import { getPlaneArg } from 'utils/getPlaneArgs'
import ReactDOMServer from 'react-dom/server'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { styled, Typography } from '@mui/material'

const AnimatedBox = styled('div')({
  '@keyframes pulsate': {
    from: {
      transform: 'translateY(0)'
    },
    to: {
      transform: 'translateY(-25%)'
    }
  },
  animation: 'pulsate 10s infinite linear',
  position: 'absolute'
})

const textContent = `在3D的環境中可以把它當成視角, 我們可以給它定位、關注點, 也可以搭配相機的位置角度來達到畫面移動的效果, 在一般的情況下相機使用非常容易，我們只需要給他合理的定位以及目標即可。

我們有以下幾種預設相機可供選擇

PerspectiveCamera
OrthographicCamera
StereoCamera
CubeCamera
一般情況中我們最常用的即是視野相機PerspectiveCamera
相機都包含以下幾個屬性

position 相機的位置
up 相機的頂點
lookAt 相機的關注目標`

export default function GalleryPlane({
  setPlane,
  cssScene
}: {
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
  cssScene: Scene
}) {
  const ref = useRef<Mesh>()
  const cssRef = useRef<CSS3DObject>()
  const { camera } = useThree()

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
  }, [setPlane, camera, cssScene])

  useEffect(() => {
    setPlaneProps('back', ref.current, setPlane, cssRef.current)
  }, [cssScene, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function Gallery() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <AnimatedBox>
        <Typography textAlign={'center'} fontSize={'28px'}>
          {textContent}
          {textContent}
          {textContent}
        </Typography>
      </AnimatedBox>
    </div>
  )
}
