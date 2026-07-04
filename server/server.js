import dotenv from "dotenv"
dotenv.config()
import interviewRoutes from "./routes/interviewRoutes.js";
import Express from "express"
import cors from "cors";

console.log("RAW KEY:", JSON.stringify(process.env.ELEVENLABS_API_KEY))
console.log("RAW VOICE:", JSON.stringify(process.env.ELEVENLABS_VOICE_ID))
const App = Express()
//to connnect react and express each other 
App.use(cors());

App.use(Express.json()); 

App.use("/interview", interviewRoutes)//"Any request beginning with /interview should be handled by interviewRoutes.js."
//*create routes or connect route
App.get("/" , (req, res)  => {
res.send("Start Interview")
});

// start listening
App.listen(5000, () => {
    console.log("Server running on port 5000");
});