import express from "express"
import cardRoutes from "./routes"
import cors from 'cors';

// Poner aca el puerto donde corre el fronted
const FrontedPort = 5173


const app = express()



app.use(cors({
    origin: `http://localhost:${FrontedPort}`, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json())

app.use("/api", cardRoutes)


export default app