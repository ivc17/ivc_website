import Loader from 'components/Loader'
import React, { useState, useCallback, useMemo } from 'react'

interface LoaderContextType {
  setLoaderProgress: (current: number, total: number) => void
}

export const LoaderContext = React.createContext<LoaderContextType>({
  setLoaderProgress: () => {}
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0)

  const setLoaderProgress = useCallback((current: number, total: number) => {
    setProgress(Math.ceil((current / total) * 100))
  }, [])

  const val = useMemo(
    () => ({
      setLoaderProgress
    }),
    [setLoaderProgress]
  )

  return (
    <LoaderContext.Provider value={val}>
      {children}
      {progress !== 100 && <Loader progress={progress} />}
      {/* {progress === 100 && <Loader progress={progress} />} */}
    </LoaderContext.Provider>
  )
}
