import dotenv from "dotenv"
dotenv.config()
import interviewRoutes from "./routes/interviewRoutes.js";
import Express from "express"
import cors from "cors";


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
const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});