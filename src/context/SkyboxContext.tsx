import React, { useState, useCallback, useMemo } from 'react'
import { Mesh, Vector3 } from 'three'

export type SetPlane = (
  direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
  plane: Mesh | undefined
) => void

interface SkyboxContextType {
  leftPlane: Mesh | undefined
  rightPlane: Mesh | undefined
  backPlane: Mesh | undefined
  topPlane: Mesh | undefined
  bottomPlane: Mesh | undefined
  cameraTarget: Vector3
  setPlane: (
    direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
    plane: Mesh | undefined
  ) => void
}
const target = new Vector3(0, 0, 0)
export const SkyboxContext = React.createContext<SkyboxContextType>({
  leftPlane: undefined,
  rightPlane: undefined,
  backPlane: undefined,
  topPlane: undefined,
  bottomPlane: undefined,
  setPlane: () => {},
  cameraTarget: target
})
export const SkyboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [leftPlane, setLeftPlane] = useState<Mesh | undefined>(undefined)
  const [rightPlane, setRightPlane] = useState<Mesh | undefined>(undefined)
  const [backPlane, setBackPlane] = useState<Mesh | undefined>(undefined)
  const [topPlane, setTopPlane] = useState<Mesh | undefined>(undefined)
  const [bottomPlane, setBottomPlane] = useState<Mesh | undefined>(undefined)

  const setPlane = useCallback(
    (
      direction: 'left' | 'right' | 'top' | 'bottom' | 'back',
      plane: Mesh | undefined
    ) => {
      if (!plane) return
      switch (direction) {
        case 'left':
          setLeftPlane(plane)
          break
        case 'back':
          setBackPlane(plane)
          break
        case 'right':
          setRightPlane(plane)
          break
        case 'top':
          setTopPlane(plane)
          break
        default:
          setBottomPlane(plane)
          break
      }
    },
    []
  )

  const val = useMemo(
    () => ({
      leftPlane,
      rightPlane,
      backPlane,
      topPlane,
      bottomPlane,
      setPlane,
      cameraTarget: target
    }),
    [backPlane, bottomPlane, leftPlane, rightPlane, setPlane, topPlane]
  )

  return <SkyboxContext.Provider value={val}>{children}</SkyboxContext.Provider>
}
