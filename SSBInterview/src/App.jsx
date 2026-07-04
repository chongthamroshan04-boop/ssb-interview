

import Spinner from "./components/Spinner"
import Navbar from "./Page/Navbar"
import Ssb from "./Page/Ssb"
import { Route,Routes,BrowserRouter } from "react-router-dom"
function App() {
  return (
    <>
    <BrowserRouter>  
  <Routes>
   <Route path="/" element={<Navbar />} />
    <Route path="/ssb" element={<Ssb />} />
    <Route path="/spinner" element={<Spinner />} />
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
