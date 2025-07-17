import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {

  const navigate = useNavigate();
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <h1>App by Chethan K Venkatesh</h1>
      <div className="card">
        <button onClick={() => navigate('/product-gallery')} className="goto-button">
          Go to product gallery
        </button>
      </div>
    </>
  )
}

export default App
