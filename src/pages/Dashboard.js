
import {useState,useEffect,useRef} from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';

import { Button,IconButton} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
export default function Dashboard(){
    const [toggle,setToggle] = useState(true)
    const [start,setStart] =useState(false)
    const [stop,setStop] =useState(false)
    const eventref = useRef(true)
    const resolverref=useRef('')
    const navigate =useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const {name} =useParams()
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
    // const {
    //     status,
    //     startRecording: startRecord,
    //     stopRecording: stopRecord,
    //     mediaBlobUrl
    //   } = useReactMediaRecorder({ screen, audio, video });
    const logout=()=>{
localStorage.removeItem("ACCESS_TOKEN")
    }
useEffect(()=>{
    if(start){
    (async ()=>{
        let stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,audio:true
        });
      //   let audio = await navigator.mediaDevices.getUserMedia({ 
      //     audio: true, video: false })
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9", "audio/webm","audio/webm;codecs=opus") 
        ? "video/webm; codecs=vp9" 
        : "video/webm"
let mediaRecorder = new MediaRecorder(stream, {
   mimeType: mime
})

let chunks = []
mediaRecorder.addEventListener('dataavailable', function(e) {
   chunks.push(e.data)
})
mediaRecorder.addEventListener('stop', function(){
  let blob = new Blob(chunks, {
      type: chunks[0].type
  })
  let url = URL.createObjectURL(blob)



  let a = document.createElement('a')
  a.href = url
  a.download = 'video.webm'
  a.click()
})

//we have to start the recorder manually
mediaRecorder.start()
setStop(true)

let promise =new Promise((resolve,reject)=>{
    resolverref.current = resolve

})
promise.then(()=>{mediaRecorder.stop();console.log('promise ended')})
//   document.getElementById("stop").addEventListener('click',()=>{
//     mediaRecorder.stop()
//     setToggle(true)
// console.log('clicked')
// })

      })()}

},[toggle])
    return <>
    <nav className="w-100 border d-flex justify-content-between">
        <div>
            <span style={{color:"blue"}}>LOGO</span>
        </div>
        <div className="d-flex flex-row justify-content-around align-items-center">
        <div className="mx-2">
        {!toggle||<Button endIcon={<RadioButtonCheckedIcon sx={{color:"red"}}/>} onClick={()=>{setStart(true)
        setToggle(false)
        }}>start</Button>}
        {!stop||<Button id="stop" endIcon={<StopIcon sx={{color:"red"}}/>}onClick={()=>{eventref.current=false
        setStart(false)
        setStop(false)
        setToggle(true)
        resolverref.current()
        }}>stop</Button>}
        </div>
        <h6 className="mx-2">{name}</h6>
        <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         <Avatar sx={{ width: 32, height: 32 }}>{name[0]}</Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={()=>{handleClose();logout();navigate('/')}}>Logout</MenuItem>
      </Menu>
    </div>
        </div>
        </nav>
    {/* <div>
    <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div> */}
   
    <footer>

    </footer>
    </>
}