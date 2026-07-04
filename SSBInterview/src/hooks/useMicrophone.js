import { useEffect } from "react";
import { useRef,useState } from "react";

const useMicrophone = () => {

 const [permission, setPermission] = useState("waiting");
 const streamRef = useRef(null)
useEffect(() =>{
 setTimeout(() =>{
    //useRef() creates a container (box) that remembers a value without causing re-renders.
  
navigator.mediaDevices.getUserMedia({audio:true //mediaDevices is like pipe line and Capture and save sound
 }) //we get stream from getUserMedia after users click
.then((stream) =>{ //Inside this function, stream exists.
  setPermission("granted")
  streamRef.current = stream //we store stream because we use stream later 
    console.log("Stream saved:", streamRef.current) 

 })
 .catch(() =>{
  setPermission("denied")
 })
  },3000)
},[])
    return {
permission,
  streamRef //we return streamRef because we store stream 
    }
}

export default useMicrophone

