import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from "swagger-jsdoc";
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from './config/db.js';

//routes import
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middelwares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
//dot env config
dotenv.config()

//mongoDB Connection
connectDB();

//Swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express()

//middelware
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
/*app.get('/', (req, res) => {
    res.send("<h1>Welcome to JOB PORTAL</h1>")
})*/
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes);

//swagger api route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

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
