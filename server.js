import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors";
import morgan from "morgan";
import connectDB from './config/db.js';

//routes import
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middelwares/errorMiddleware.js';
//dot env config
dotenv.config()

//mongoDB Connection
connectDB();


//rest object
const app = express()

//middelware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
/*app.get('/', (req, res) => {
    res.send("<h1>Welcome to JOB PORTAL</h1>")
})*/
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes)

//validation middelware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(
        `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
            .bgCyan.white
    );
});
