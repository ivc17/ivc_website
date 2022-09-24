import React, { useEffect, useRef } from 'react'
import { Mesh, Scene } from 'three'
import { setPlaneProps } from 'utils/setPlaneProps'
import { SetPlane } from 'context/SkyboxContext'
import { Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import ReactDOMServer from 'react-dom/server'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import Box from 'components/Box'
import { AnimatedBox } from './AnimatedBox'

const textContent = Array.from(Array(20).keys()).reduce((acc) => {
  acc += `EMAIL: ivc1741@gmail.com\nGITHUB: ivc17\nWEBTSITE:https://ivc17.github.io/\n`
  return acc
}, '')

export default function ContactPlane({
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

    const str = ReactDOMServer.renderToString(<Contact />)

    const element = document.createElement('div')
    element.innerHTML = str
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.boxSizing = 'border-box'

    var obj = new CSS3DObject(element)
    cssRef.current = obj
    cssScene.add(obj)
  }, [cssScene, setPlane])

  useEffect(() => {
    setPlaneProps('right', ref.current, setPlane, cssRef.current)
  }, [cssScene, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function Contact() {
  return (
    <div
      id="contact"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
      }}
    >
      <AnimatedBox direction="downward">
        <Box display="grid">
          <div style={{ display: 'flex', gap: '10px' }}>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {textContent}
            </Typography>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {textContent}
            </Typography>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {textContent}
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {textContent}
            </Typography>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {textContent}
            </Typography>
            <Typography
              textAlign={'left'}
              fontSize={'18px'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {textContent}
            </Typography>
          </div>
        </Box>
      </AnimatedBox>
    </div>
  )
}
