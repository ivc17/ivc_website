import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Box from 'components/Box'
import Header from 'components/Header'
import Home from 'pages/Home'
import { SkyboxProvider } from 'context/SkyboxContext'

function App() {
  return (
    <Box>
      <SkyboxProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={'*'} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SkyboxProvider>
    </Box>
  )
}

export default App
