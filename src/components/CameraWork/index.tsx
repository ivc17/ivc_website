import { RootState, useFrame, useThree } from '@react-three/fiber'
import { cameraPositions, initCameraPosition } from 'constants/index'
import { routes } from 'constants/routes'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Group, MathUtils, Mesh, Vector3 } from 'three'

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
  divider = 10,
  pathname,
  aboutPlane,
  galleryPlane,
  contactPlane,
  cameraTarget
}: {
  divider?: number
  pathname?: string
  aboutPlane?: Mesh | undefined
  galleryPlane?: Mesh | undefined
  contactPlane?: Mesh | undefined
  cameraTarget: Vector3
}) {
  const { camera } = useThree()
  const [nextPosition, setNextPosition] = useState(new Vector3(0, 0, 0))
  const [nextCameraPosition, setNextCameraPosition] =
    useState(initCameraPosition)

  useFrame((state: RootState) => {
    pathChange(state, pathname)
  })

  const pathChange = useCallback(
    (state: RootState, pathname) => {
      camera.lookAt(cameraTarget)
      cameraTarget.lerp(nextPosition, 0.05)
      camera.position.lerp(nextCameraPosition, 0.05)

      if (pathname === '/') {
        camera.rotation.y = MathUtils.lerp(
          camera.rotation.y,
          (state.mouse.x * Math.PI) / divider,
          0.05
        )
        camera.rotation.x = MathUtils.lerp(
          camera.rotation.x,
          (state.mouse.y * Math.PI) / divider,
          0.05
        )
      }
    },
    [camera, cameraTarget, divider, nextCameraPosition, nextPosition]
  )

  useEffect(() => {
    switch (pathname) {
      case routes.gallery:
        if (galleryPlane) {
          const newTarget = new Vector3(
            galleryPlane.position.x,
            0,
            galleryPlane.position.z / 2
          )
          setNextPosition(newTarget)
          setNextCameraPosition(cameraPositions[routes.gallery])
        }
        break
      case routes.contact:
        if (contactPlane) {
          setNextPosition(contactPlane.position)
          setNextCameraPosition(cameraPositions[routes.contact])
        }
        break
      case routes.about:
        if (aboutPlane) {
          setNextPosition(aboutPlane.position)
          setNextCameraPosition(cameraPositions[routes.about])
        }
        break
      default:
        setNextPosition(new Vector3(0, 0, 0))
        setNextCameraPosition(initCameraPosition)
    }
  }, [
    aboutPlane,
    camera,
    camera.rotation.y,
    cameraTarget,
    contactPlane,
    divider,
    galleryPlane,
    pathname
  ])

  return <></>
}
