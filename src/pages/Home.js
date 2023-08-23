import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react'

import {IconButton, TextField} from '@mui/material';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function Home(){
    const [data,setData]=useState({email:"",name:""})
    const navigate =useNavigate()
    const [err,setErr]=useState("")
    return<div className="d-flex flex-row vh-100">

        <div className="w-75 d-flex">
            <p className="align-self-center h2 text-primary px-5">hello welcome to our site</p>
        </div>
        <div className="w-25 d-flex">
            <form className="d-flex flex-column align-self-center" onSubmit={async (e)=>{
                const data={email:e.target.email.value,name:e.target.name.value}
                e.preventDefault()
                try{
                    let submitting =await axios.post("http://localhost:4000/login",data)
                    if(submitting.status ==200){
                        localStorage.setItem("ACCESS_TOKEN",submitting.data)
                        navigate(`/user/${data.name}`)
                        console.log(submitting.data)
                    }
                }
                catch(err){
                    if(err.response.status==404 && err.response.data=="user not found"){
                        try{

                      let registering =await axios.post("http://localhost:4000/register",data)
                      let login=await axios.post("http://localhost:4000/login",data)
                      localStorage.setItem("ACCESS_TOKEN",login.data)
                      navigate(`/user/${data.name}`)
                      console.log(login.data)
                    }
                    catch(err){
                        setErr(err.response.message)
                    }
                    }
                }

                // let submitting =await axios.post("http://localhost:4000/login",data)
                // if(submitting.status ==200){
                //     localStorage.setItem("ACCESS_TOKEN",submitting.data)
                //     navigate("/user")
                //     console.log(submitting.data)
                // }
                // else if(submitting.status==404 && submitting.data=="user not found"){
                //     let registering =await axios.post("http://localhost:4000/register",data)
                //     if(registering.status==200){
                //         let login=await axios.post("http://localhost:4000/login",data)
                //         localStorage.setItem("ACCESS_TOKEN",login.data)
                //         navigate("/user")
                //         console.log(login.data)
                //     }
                // }

                }}>
        <TextField variant="standard" label="email" name="email" onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))} value={data.email}/>
        <TextField variant="standard" label="name" name="name" onChange={(e)=>setData(prev=>({...prev,name:e.target.value}))} value={data.name}/>
         <IconButton type='submit' >
            <ArrowForwardIcon/>
         </IconButton>
               
        
            </form>
        </div>
    </div>
}