import Loader from 'components/Loader'
import React, { useState, useCallback, useMemo, useEffect } from 'react'

interface LoaderContextType {
  setLoaderProgress: (current: number, total: number) => void
}

export const LoaderContext = React.createContext<LoaderContextType>({
  setLoaderProgress: () => {}
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(true)

  const setLoaderProgress = useCallback((current: number, total: number) => {
    setProgress(Math.ceil((current / total) * 100))
  }, [])

  const val = useMemo(
    () => ({
      setLoaderProgress
    }),
    [setLoaderProgress]
  )

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setDisplay(false)
      }, 1000)
    }
  }, [progress])

  return (
    <LoaderContext.Provider value={val}>
      {children}
      {display && <Loader progress={progress} />}
      {/* {progress === 100 && <Loader progress={progress} />} */}
    </LoaderContext.Provider>
  )
}
