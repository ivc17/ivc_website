import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Box from 'components/Box'
import Header from 'components/Header'
import Home from 'pages/Home'
import { SkyboxProvider } from 'context/SkyboxContext'
import { LoaderProvider } from 'context/LoaderContext'

function App() {
  return (
    <>
      <Box>
        <LoaderProvider>
          <SkyboxProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path={'*'} element={<Home />} />
              </Routes>
            </BrowserRouter>
          </SkyboxProvider>
        </LoaderProvider>
      </Box>
    </>
  )
}

export default App
