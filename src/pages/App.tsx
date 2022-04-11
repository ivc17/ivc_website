import { Box } from '@mui/material'
import Header from 'components/Header'
import Home from 'pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

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
