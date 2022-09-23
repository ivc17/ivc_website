import { useEffect, useRef } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Mesh, Scene } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from 'utils/setPlaneProps'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import { AnimatedBox } from './AnimatedBox'

const textContent = `Expert knowledge of HTML/CSS/JavaScript/Browser
Familiar with one of React/Vue/Svelte frameworks.
Experience in accessibility, usability, and scalability
Knowledge of web performance-optimizing
Expert knowledge of HTML/CSS/JavaScript/Browser/NodeJS.
Master in Code testability, readability, maintainability, 
scalability, reusability, and modularization.
Master in web performance-optimizing.
Familiar with one of React/Vue/Svelte frameworks.
Familiar with unit/UI/integration testing.
Experience in building complete CI/CD.`

export default function BottomPlane({
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
    setPlaneProps('bottom', ref.current, setPlane, cssRef.current)
  }, [cssScene, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
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
        alignItems: 'flex-start'
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