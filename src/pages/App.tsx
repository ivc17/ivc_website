import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Box from 'components/Box'
import Header from 'components/Header'
import Home from 'pages/Home'

function App() {
  return (
    <Box>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
