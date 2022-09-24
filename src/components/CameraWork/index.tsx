import { debounce } from '@mui/material'
import { RootState, useFrame, useThree } from '@react-three/fiber'
import {
  cameraPositions,
  cameraPositionsXs,
  defaultZoom,
  initCameraPosition
} from 'constants/index'
import { routes } from 'constants/routes'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Group, MathUtils, Mesh, Vector3 } from 'three'
let touchPos = { x: 0, y: 0 }

export function CameraWorkMovement({
  children,
  divider = 30,
  disable
}: {
  children: React.ReactNode
  divider?: number
  disable?: boolean
}) {
  const ref = useRef<Group>()

  useFrame((state) => {
    if (ref.current && !disable) {
      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        (state.mouse.x * Math.PI) / divider,
        0.05
      )
      ref.current.rotation.x = MathUtils.lerp(
        ref.current.rotation.x,
        -(state.mouse.y * Math.PI) / divider,
        0.05
      )
    }
  })

  return <group ref={ref}>{children}</group>
}

export default function CameraWork({
  divider = 100,
  pathname,
  aboutPlane,
  galleryPlane,
  contactPlane,
  cameraTarget,
  bottomPlane,
  isDownMd
}: {
  divider?: number
  pathname?: string
  aboutPlane?: Mesh | undefined
  galleryPlane?: Mesh | undefined
  contactPlane?: Mesh | undefined
  cameraTarget: Vector3
  bottomPlane?: Mesh | undefined
  isDownMd?: boolean
}) {
  const { camera } = useThree()
  const [isDrag, setIsDrag] = useState(false)
  const [nextPosition, setNextPosition] = useState(new Vector3(0, 0, 0))
  const [nextCameraPosition, setNextCameraPosition] =
    useState(initCameraPosition)

  useFrame((state: RootState) => {
    pathChange(state, pathname, state.clock.elapsedTime, isDrag)
  })

  const pathChange = useCallback(
    (state: RootState, pathname, time, isDrag: boolean) => {
      camera.lookAt(cameraTarget)
      cameraTarget.lerp(nextPosition, 0.05)
      camera.position.lerp(nextCameraPosition, 0.05)

      if (pathname === '/') {
        // console.log(MathUtils.smoothstep(Math.abs(Math.sin(time)), 0, 1))
        camera.rotation.y = MathUtils.lerp(
          camera.rotation.y,
          ((isDrag ? touchPos.x : state.mouse.x) * Math.PI) / divider,
          // 0.05
          MathUtils.smoothstep(time, -1, 1)
        )
        camera.rotation.x = MathUtils.lerp(
          camera.rotation.x,
          -(((isDrag ? touchPos.y : state.mouse.y) * Math.PI) / divider) * 1.5,
          // 0.05
          MathUtils.smoothstep(time, -1, 1)
          // MathUtils.smoothstep(Math.abs(Math.sin(time)), 0, 1)
        )
      }
    },
    [camera, cameraTarget, divider, nextCameraPosition, nextPosition]
  )

  useEffect(() => {
    const startDrag = debounce(() => {
      setIsDrag(true)
    }, 300)
    const endDrag = () => {
      setIsDrag(false)
    }
    const onDrag = (e: any) => {
      touchPos.x = e.targetTouches[0].clientX / 200
      touchPos.y = e.targetTouches[0].clientY / 200
    }

    window.addEventListener('touchstart', startDrag)
    window.addEventListener('touchend', endDrag)
    window.addEventListener('touchmove', onDrag)
    return () => {
      window.removeEventListener('touchstart', startDrag)
      window.removeEventListener('touchend', endDrag)
      window.addEventListener('touchmove', onDrag)
    }
  }, [])

  useEffect(() => {
    isDownMd ? (camera.zoom = defaultZoom.xs) : (camera.zoom = defaultZoom.md)
  }, [camera, isDownMd])

  useEffect(() => {
    if (pathname === routes.about && isDownMd) {
      document.getElementById('contact')?.classList.add('hidden')
    } else {
      document.getElementById('contact')?.classList.remove('hidden')
    }

    if (pathname === routes.contact && isDownMd) {
      document.getElementById('about')?.classList.add('hidden')
    } else {
      document.getElementById('about')?.classList.remove('hidden')
    }
  }, [isDownMd, pathname])

  useEffect(() => {
    const cp = isDownMd ? cameraPositionsXs : cameraPositions
    switch (pathname) {
      case routes.gallery:
        if (galleryPlane) {
          setNextPosition(galleryPlane.position)
          setNextCameraPosition(cp[routes.gallery])
        }
        break
      case routes.contact:
        if (contactPlane) {
          setNextPosition(contactPlane.position)
          setNextCameraPosition(cp[routes.contact])
        }
        break
      case routes.about:
        if (aboutPlane) {
          setNextPosition(aboutPlane.position)
          setNextCameraPosition(cp[routes.about])
        }
        break
      default:
        if (pathname?.match(/\/gallery\/(.+)/) && bottomPlane) {
          setNextPosition(bottomPlane.position)
          setNextCameraPosition(cp[routes.singlWork])
        } else {
          setNextPosition(new Vector3(0, 0, 0))
          setNextCameraPosition(initCameraPosition)
        }
    }
  }, [
    aboutPlane,
    bottomPlane,
    camera,
    camera.rotation.y,
    cameraTarget,
    contactPlane,
    divider,
    galleryPlane,
    isDownMd,
    pathname
  ])

  return <></>
}
