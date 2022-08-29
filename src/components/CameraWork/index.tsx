import { useFrame, useThree } from '@react-three/fiber'
import { initCameraPosition } from 'constants/index'
import { routes } from 'constants/routes'
import useSkybox from 'hooks/useSkybox'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { CameraHelper, Group, MathUtils, Mesh, Vector3 } from 'three'

export function CameraWorkMovement({
  children,
  divider = 30
}: {
  children: React.ReactNode
  divider?: number
}) {
  const ref = useRef<Group>()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        (state.mouse.x * Math.PI) / divider,
        0.05
      )
      ref.current.rotation.x = MathUtils.lerp(
        ref.current.rotation.x,
        (state.mouse.y * Math.PI) / divider,
        0.05
      )
    }
  })

  return <group ref={ref}>{children}</group>
}

export default function CameraWork({
  divider = 200,
  pathname,
  aboutPlane,
  galleryPlane,
  contactPlane
}: {
  divider?: number
  pathname?: string
  aboutPlane?: Mesh | undefined
  galleryPlane?: Mesh | undefined
  contactPlane?: Mesh | undefined
}) {
  const { camera, scene } = useThree()

  useFrame((state) => {
    // if (pathname === '/') {
    //   camera.rotation.y = MathUtils.lerp(
    //     0,
    //     (state.mouse.x * Math.PI) / divider,
    //     0.05
    //   )
    //   camera.rotation.x = MathUtils.lerp(
    //     0,
    //     (state.mouse.y * Math.PI) / divider,
    //     0.05
    //   )
    //   camera.rotation.z = MathUtils.lerp(
    //     0,
    //     (state.mouse.y * Math.PI) / divider,
    //     0.05
    //   )
    // }
  })

  useEffect(() => {
    const helper = new CameraHelper(camera)
    scene.add(helper)

    switch (pathname) {
      case '/gallery':
        if (galleryPlane) {
          camera.position.z = -galleryPlane.position.z
          camera.position.x = galleryPlane.position.x

          camera.lookAt(galleryPlane.position)
          camera.updateProjectionMatrix()
        }
        break
      case '/about':
        if (aboutPlane) {
          camera.position.z = aboutPlane.position.z / 2
          camera.position.x = -aboutPlane.position.x
          camera.lookAt(aboutPlane.position)

          camera.updateProjectionMatrix()
        }
        break
      case '/contact':
        if (contactPlane) {
          camera.position.z = contactPlane.position.z / 2
          camera.position.x = -contactPlane.position.x
          camera.lookAt(contactPlane.position)

          // camera.position.z = aboutPlane.position.z
          // camera.position.x = aboutPlane.position.x

          camera.updateProjectionMatrix()
        }
        break
      default:
        camera.rotation.set(0, 0, 0)
        camera.position.set(
          initCameraPosition.x,
          initCameraPosition.y,
          initCameraPosition.z
        )
        break
    }
  }, [aboutPlane, camera, contactPlane, galleryPlane, pathname, scene])

  return <></>
}
