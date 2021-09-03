require('dotenv').config()
const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 5001

connectDB()
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json())

app.use('/posts', postRoutes);
app.use("/user", userRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () =>
    console.log(`Server is running on port ${port}`))
