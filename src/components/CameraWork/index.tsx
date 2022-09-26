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
import { getPlaneArg } from 'utils/getPlaneArgs'
const isMobile = window.innerWidth < 600

var mouseTarget = new Vector3()
var mouseX = 0,
  mouseY = 0

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
        0.03
      )
      ref.current.rotation.x = MathUtils.lerp(
        ref.current.rotation.x,
        -(state.mouse.y * Math.PI) / divider,
        0.03
      )
    }
  })

  return <group ref={ref}>{children}</group>
}

const { width, halfHeight } = getPlaneArg()

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
  const [nextPosition, setNextPosition] = useState(new Vector3(0, 0, 0))
  const [nextCameraPosition, setNextCameraPosition] =
    useState(initCameraPosition)

  useFrame((state: RootState) => {
    pathChange(pathname)
  })

  const pathChange = useCallback(
    (pathname) => {
      cameraTarget.lerp(nextPosition, 0.05)
      camera.position.lerp(nextCameraPosition, 0.05)

      if (pathname === '/') {
        const moveX = (mouseX - mouseTarget.x) * (isMobile ? 0.001 : 0.0002)
        const moveY = (-mouseY - mouseTarget.y) * (isMobile ? 0.001 : 0.0002)

        const x = mouseTarget.x
        const y = mouseTarget.y
        const targetW = width / (isMobile ? 60 : 80)
        const targetH = halfHeight / (isMobile ? 25 : 50)

        x + moveX >= targetW
          ? (mouseTarget.x = targetW)
          : x + moveX <= -targetW
          ? (mouseTarget.x = -targetW)
          : (mouseTarget.x += moveX)

        y + moveY >= targetH
          ? (mouseTarget.y = targetH)
          : y + moveY <= -targetH
          ? (mouseTarget.y = -targetH)
          : (mouseTarget.y += moveY)

        mouseTarget.z = -10 // assuming the camera is located at ( 0, 0, z );

        camera.lookAt(mouseTarget)

        // camera.rotation.y = MathUtils.lerp(
        //   camera.rotation.y,
        //   ((isMobile ? touchPos.x ?? initCameraPosition.y : state.mouse.x) *
        //     Math.PI) /
        //     divider,
        //   // 0.05
        //   MathUtils.smoothstep(time, -1, 1)
        // )
        // camera.rotation.x = MathUtils.lerp(
        //   camera.rotation.x,
        //   -(
        //     ((isMobile ? touchPos.y ?? initCameraPosition.x : state.mouse.y) *
        //       Math.PI) /
        //     divider
        //   ) * 1.5,
        //   // 0.05
        //   MathUtils.smoothstep(time, -1, 1)
        //   // MathUtils.smoothstep(Math.abs(Math.sin(time)), 0, 1)
        // )
      } else {
        camera.lookAt(cameraTarget)
      }
    },
    [camera, cameraTarget, nextCameraPosition, nextPosition]
  )

  useEffect(() => {
    const startDrag = debounce((e) => {
      mouseX = e.touches[0].clientX - window.innerWidth / 2
      mouseY = e.touches[0].clientY - window.innerHeight / 2
    }, 300)

    const onDrag = (e: any) => {
      mouseX = e.touches[0].clientX - window.innerWidth / 2
      mouseY = e.touches[0].clientY - window.innerHeight / 2
      const el = document.getElementById('cursor')
      if (el) {
        el.style.transform = `translate(${e.targetTouches[0].clientX}px, ${e.targetTouches[0].clientY}px)`
      }
    }

    const onMove = (e: any) => {
      mouseX = e.clientX - window.innerWidth / 2
      mouseY = e.clientY - window.innerHeight / 2
    }

    window.addEventListener('touchstart', startDrag)
    window.addEventListener('touchmove', onDrag)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('touchstart', startDrag)
      window.addEventListener('touchmove', onDrag)
      window.removeEventListener('mousemove', onMove)
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
