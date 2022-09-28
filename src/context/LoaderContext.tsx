import Loader from 'components/Loader'
import { routes } from 'constants/routes'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface LoaderContextType {
  setLoaderProgress: (current: number, total: number) => void
  finishLoading: boolean
}

export const LoaderContext = React.createContext<LoaderContextType>({
  setLoaderProgress: () => {},
  finishLoading: false
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(true)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const setLoaderProgress = useCallback((current: number, total: number) => {
    setProgress(Math.ceil((current / total) * 100))
  }, [])

  const val = useMemo(
    () => ({
      setLoaderProgress,
      finishLoading: !display
    }),
    [display, setLoaderProgress]
  )

  useEffect(() => {
    if (pathname !== '/') {
      return setDisplay(false)
    }
    if (progress === 100) {
      setTimeout(() => {
        setDisplay(false)
      }, 2000)
    }
  }, [pathname, progress])

  useEffect(() => {
    let path = localStorage.getItem('path')
    localStorage.removeItem('path')
    if (path) {
      if (('/' + path).includes(routes.gallery)) {
        return navigate('/' + path)
      }
      if (('/' + path).includes(routes.about)) {
        return navigate('/' + path)
      }
      if (('/' + path).includes(routes.contact)) {
        return navigate('/' + path)
      }
      return navigate('/')
    }
  }, [navigate])

  return (
    <LoaderContext.Provider value={val}>
      {children}
      {display && <Loader progress={progress} />}
      {/* {progress === 100 && <Loader progress={progress} />} */}
    </LoaderContext.Provider>
  )
}
