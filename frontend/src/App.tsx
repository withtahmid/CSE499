import { useEffect } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Navbar from './components/Navbar'
import MetadataForm from './components/metadata/MetadataForm'
import { useSelector } from 'react-redux'
import Container from './components/Container'
import Drawer from './components/Drawer'
import Footer from './components/Footer'
import { ToastProvider } from './components/toast/ToastProvider'
import ChartDriver from './components/ChartDriver'
import BarChart from './components/ChartDriver'

function App() {


  return (
    <div className='h-screen w-full bg-base-300 flex flex-col'>
        {/* <Navbar /> */}
        <ToastProvider>
          <Container />
        </ToastProvider>
        {/* <Footer /> */}
    </div>
  )
  // return <ChartDriver score = { 50 } />
}

export default App
