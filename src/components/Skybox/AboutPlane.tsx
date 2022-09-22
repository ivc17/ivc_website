import { useEffect, useRef } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {} from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, Scene } from 'three'
import { SetPlane } from 'context/SkyboxContext'
import { setPlaneProps } from 'utils/setPlaneProps'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { styled, Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import { defaultVert, emptyFrag } from 'shaders/basicShaders'

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

const textContent = `IVC17,  a Taipei based creative web developer/designer

that loves the digital space, and is all about being experimental  and create crazy visuals in the virtual space. 

Experienced in both web2/web3 web with particular interest in NFTs.

Mostly work with code but occasionally other mediums too. 

I’m always looking for next exciting project, drop me a message here___ If you’ have any cool ideas that wants to be carried out. `

export default function AboutPlane({
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

    const str = ReactDOMServer.renderToString(<About />)

    const element = document.createElement('div')
    element.innerHTML = str
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    element.style.boxSizing = 'border-box'

    var obj = new CSS3DObject(element)
    cssRef.current = obj
    cssScene.add(cssRef.current)

    // const resize = () => {
    //   setPlaneProps('left', ref.current, undefined, cssRef.current)
    // }
    // window.addEventListener('resize', resize)
  }, [cssScene])

  useEffect(() => {
    setPlaneProps('left', ref.current, setPlane, cssRef.current)
  }, [cssScene, setPlane])

  return (
    <mesh ref={ref} position={[0, 0, 0]} visible={false}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

function About() {
  return (
    <div
      id="about"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '30%'
      }}
    >
      <AnimatedBox>
        <Typography textAlign={'center'} fontSize={'20px'} padding="20px">
          {textContent}
          <br />
          {textContent}
          <br />
          {textContent}
          <br />
          {textContent}
          <br />
        </Typography>
      </AnimatedBox>
    </div>
  )
}
