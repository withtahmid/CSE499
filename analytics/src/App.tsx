import { useEffect, useState } from 'react'
import './App.css'
import { fetchAllConversations } from './store/coreSlice'
import { useAppDispatch, useAppSelector } from './store'
import AllData from './components/AllData'
import Drawer from './components/Drawer'
import MaleFemale from './components/MaleFemale'
import TimeProgress from './components/TimeProgress'
import ScoreAvg from './components/ScoreAvg'
function App() {
  const dispatch = useAppDispatch();
  const con = useAppSelector(state => state.core.conversations)
  useEffect(() => {
    dispatch(fetchAllConversations());
  }, [])
  return (
    // <Drawer />
    <div> 
      {/* <MaleFemale /> */}
       {/* <TimeProgress /> */}
       
       {/* <ScoreAvg /> */}
       <AllData />
    </div>
  )
}

export default App
