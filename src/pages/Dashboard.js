import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useState,useEffect,useRef} from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';
import TextField from '@mui/material/TextField';
import { Button,IconButton} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function Dashboard(){
    const [toggle,setToggle] = useState(true)
    const [start,setStart] =useState(false)
    const [stop,setStop] =useState(false)
    const [downloadopen, setdownloadOpen] = useState(false);
      let [err,setErr]=useState('')

    const handleClickOpen = () => {
      setdownloadOpen(true);
    };
  
    const handleClickClose = () => {
      setdownloadOpen(false);
    };
    const eventref = useRef(true)
    const resolverref=useRef('')
    const downloadref = useRef('')
    const downloadname =useRef('sample.webm')
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
      let audio
      let stream
      let mixedStream
      try{
         stream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });}
        catch(err){
          console.log(err)
          setErr("permission denied to share screen")
          setTimeout(()=>setErr(''),2000)
          setStart(false)
        setToggle(true)
        }
        try{
        audio = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });}
        catch(err){
          console.log(err)
          setErr("permission denied to microphone")
          setTimeout(()=>setErr(''),2000)
        }
        if(audio&&stream){
        mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);}
       else if(stream){
        mixedStream = new MediaStream([...stream.getTracks()])
       }
   
      if(stream){
     let recorder = new MediaRecorder(mixedStream);
    
       

let chunks = []

recorder.ondataavailable = (e)=>{
	chunks.push(e.data);
}
recorder.onstop = (e)=> {
	const blob = new Blob(chunks, { 'type' : 'video/mp4' });
	chunks = [];
  let url = URL.createObjectURL(blob)

let download = new Promise((resolve,reject)=>{
downloadref.current= resolve
})
download.then(()=>{
  let a = document.createElement('a')
  a.href = url
  a.download = downloadname.current
  a.click()
})

 
 
}

recorder.start()
setStop(true)

let promise =new Promise((resolve,reject)=>{
    resolverref.current = resolve

})
promise.then(()=>{recorder.stop();console.log('promise ended');stream.getTracks().forEach((track) => track.stop());
if(audio)audio.getTracks().forEach((track) => track.stop())
})

    }})()}

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
        handleClickOpen()
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
     <div>
      <Dialog open={downloadopen} onClose={handleClickClose}>
        <DialogTitle>Download the clip?</DialogTitle>
        <DialogContent>
      
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="enter your filename"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>downloadname.current=e.target.value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={()=>{
            downloadref.current()
            handleClickClose()}}>download</Button>
        </DialogActions>
      </Dialog>
    </div>
   { !err||<div className='position-fixed' style={{left:"35vw"}}>
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {err} — <strong>check it out!</strong>
      </Alert>
      </div>}
   
    <footer>

    </footer>
    </>
}