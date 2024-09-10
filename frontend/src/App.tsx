import { useEffect } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Navbar from './components/Navbar'
import MetadataForm from './components/MetadataForm'
import { useSelector } from 'react-redux'
import Container from './components/Container'
import Drawer from './components/Drawer'
import Footer from './components/Footer'

function App() {


  return (
    <div className='h-screen w-full bg-base-300 flex flex-col'>
        <Navbar />
        <Container />
        <Footer />
    </div>
  )
}

export default App
