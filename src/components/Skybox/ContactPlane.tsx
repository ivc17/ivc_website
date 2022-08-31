import { useEffect, useRef } from 'react'
import { Mesh, Scene } from 'three'
import { setPlaneProps } from 'utils/setPlaneProps'
import { SetPlane } from 'context/SkyboxContext'
import { styled, Typography } from '@mui/material'
import { getPlaneArg } from 'utils/getPlaneArgs'
import ReactDOMServer from 'react-dom/server'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

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

const textContent = `At some stage of your graphics adventures you will want to draw text in OpenGL. 
Contrary to what you may expect, getting a simple string to render on screen is 
all but easy with a low-level API like OpenGL. 
If you don't care about rendering more than 128 different same-sized characters, 
then it's probably not too difficult. 
Things are getting difficult as soon as each character has a different width, height, 
and margin. Based on where you live, you may also need more than 128 characters, and 
what if you want to express special symbols for like mathematical expressions or sheet music symbols, 
and what about rendering text from top to bottom? 
Once you think about all these complicated matters of text, it wouldn't surprise you 
that this probably doesn't belong in a low-level API like OpenGL.

Since there is no support for text capabilities within OpenGL, it is up to us 
to define a system for rendering text to the screen. There are no graphical primitives 
for text characters, we have to get creative. Some example techniques are: drawing letter
 shapes via GL_LINES, create 3D meshes of letters, or render character textures to 2D quads 
 in a 3D environment.
`

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

    const str = ReactDOMServer.renderToString(<Gallery />)

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

function Gallery() {
  return (
    <div
      id="contact"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
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
