import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routers/indexRouter.js'


dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

app.use(routes);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
