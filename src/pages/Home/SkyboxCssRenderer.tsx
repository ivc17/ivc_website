import { debounce } from '@mui/material'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import {
  // BoxGeometry,
  // Mesh,
  // MeshPhongMaterial,
  // NoBlending,
  // Object3D,
  Scene
} from 'three'
import {
  // CSS3DObject,
  CSS3DRenderer
} from 'three/examples/jsm/renderers/CSS3DRenderer'

// function makeElementObject(type: string, width: number, height: number) {
//   const obj: any = new Object3D()

//   const element = document.createElement(type)
//   element.style.width = width + 'px'
//   element.style.height = height + 'px'
//   element.style.opacity = '0.999'
//   element.style.boxSizing = 'border-box'

//   var css3dObject = new CSS3DObject(element)
//   obj.css3dObject = css3dObject
//   obj.add(css3dObject)

//   var material = new MeshPhongMaterial({
//     opacity: 0,
//     blending: NoBlending
//   })
//   var geometry = new BoxGeometry(width, height, 1)
//   var mesh = new Mesh(geometry, material)
//   mesh.castShadow = true
//   mesh.receiveShadow = true
//   obj.lightShadowMesh = mesh
//   obj.add(mesh)

//   return obj
// }

export default function SkyboxCSSRender({ scene }: { scene: Scene }) {
  const { camera } = useThree()
  useEffect(() => {
    const wrapper = document.querySelector('#wrapper')
    if (!camera || !scene || !wrapper) return
    const renderer = new CSS3DRenderer()
    if (!wrapper.children.length) {
      renderer.domElement.style.position = 'fixed'
      renderer.domElement.style.top = '0'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.width = '100%'
      wrapper.appendChild(renderer.domElement)
    }
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    function onWindowResize() {
      if (!wrapper) return
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    const resizeFn = debounce(onWindowResize, 500)
    window.addEventListener('resize', resizeFn)
    onWindowResize()
    animate()

    return () => {
      wrapper.innerHTML = ''
      window.removeEventListener('resize', resizeFn)
    }
  }, [camera, scene])

  return <></>
}
