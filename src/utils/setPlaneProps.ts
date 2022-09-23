import { SetPlane } from "context/SkyboxContext"
import { Mesh } from "three"
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer"
import { getPlaneArg } from "./getPlaneArgs"

export const setPlaneProps = (
  plane: 'left' | 'right' | 'top' | 'bottom' | 'back',
  mesh: Mesh | undefined,
  setPlane: SetPlane | undefined,
  cssObj?: CSS3DObject,
  isDownMd?:boolean
) => {
  if (!mesh) return
  const { width, height, halfHeight } = getPlaneArg()

  mesh.geometry.center()
  setPlane?.(plane, mesh)

  switch (plane) {
    case 'left':
      mesh.rotateY(Math.PI / 2)
      mesh.position.set(-width / 2, 0, -height / 2)
      mesh.geometry.scale(height, height, 0)
      cssObj?.rotateY(Math.PI / 2)
      cssObj?.position.set(-width / 2, 0, -height / 2)

      break
    case 'right':
      mesh.rotateY(-Math.PI / 2)
      mesh.position.set(width / 2, 0, -halfHeight)
      mesh.geometry.scale(height, height, 0)
      cssObj?.rotateY(-Math.PI / 2)
      cssObj?.position.set(width / 2, 0, -halfHeight)
      break
    case 'top':
      mesh.rotateX(Math.PI / 2)
      mesh.position.set(0, halfHeight, -halfHeight)
      mesh.geometry.scale(width, height, 0)
      cssObj?.rotateX(Math.PI / 2)
      cssObj?.position.set(0, halfHeight, -halfHeight)
      break
    case 'back':
      mesh.position.set(0, 0, -height-(isDownMd?0:70))
      mesh.geometry.scale(width, height, 0)
      cssObj?.position.set(0, 0, -height-(isDownMd?0:70))
      break
    default:
      mesh.position.set(0, -halfHeight, -halfHeight)
      mesh.rotateX(-Math.PI / 2)
      mesh.geometry.scale(width, width, 0)
      cssObj?.position.set(0, -halfHeight, -halfHeight)
      cssObj?.rotateX(-Math.PI / 2)
  }
}
