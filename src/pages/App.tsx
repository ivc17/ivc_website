import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Box from 'components/Box'
import Header from 'components/Header'
import Home from 'pages/Home'
import { SkyboxProvider } from 'context/SkyboxContext'
import { LoaderProvider } from 'context/LoaderContext'

function App() {
  return (
    <>
      <Box maxHeight={'100vh'} overflow="hidden">
        <SkyboxProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path={'*'}
                element={
                  <LoaderProvider>
                    <Home />
                  </LoaderProvider>
                }
              />
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </SkyboxProvider>
      </Box>
    </>
  )
}

export default App
