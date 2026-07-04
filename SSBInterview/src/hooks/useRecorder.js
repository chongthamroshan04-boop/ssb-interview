
/* 
What does your useRecorder hook do?

Its job is not to generate feedback.

Its only responsibility is:

"Listen to the microphone and automatically record while the user is speaking."

That's all.

*/
import { useRef, useState } from "react";
const useRecorder = (streamRef) => {


    const recorderRef = useRef(null); // This stores the actual MediaRecorder. we use useRef because the UI doesn't need to change.
 //if someone ask me what is chunk,the answer is a small piece of the recording 
    const chunksRef = useRef([]); //
    const [audioBlob, setAudioBlob] = useState(null); // to correct above chunks When recording finishes, all the pieces become one audio file.
    const startRecording = () => {
        // Already recording? Do nothing.
    if (recorderRef.current?.state === "recording") {
        return;
    }
         if (!streamRef.current) return;
         recorderRef.current = new MediaRecorder(streamRef.current);
        chunksRef.current = []; //Clear the old recording.

        recorderRef.current.ondataavailable = (event) => {
            chunksRef.current.push(event.data); 
        };

        recorderRef.current.onstop = () => { //when recording stop,conbine chunk into blob to audio
            const blob = new Blob(chunksRef.current, {
                type: "audio/webm",
            });
            setAudioBlob(blob);
        };

        recorderRef.current.start();
    };

    const stopRecording = () => {
          console.log("🛑 stopRecording CALLED");
        if (!recorderRef.current) return;

  console.log("🧠 Recorder state:", recorderRef.current.state);
        recorderRef.current.stop(); 
    };
     
   

    return {
        startRecording,
        stopRecording,
        audioBlob,
       
    };
};

export default useRecorder;