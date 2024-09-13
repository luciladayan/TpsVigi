import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const PORT = 3000;
const secretKey = "crespo"
const app = express()
const port = 3000
app.use(express.json())

app.listen(port, () => {
    console.log("Listening on port", port)
})

app.post("/hash", async (req, res) => {
    const {password} = req.body
    const salt = await bcryptjs.genSalt(10)
    const hashed = await bcryptjs.hash(password, salt)
    res.send(hashed)
})

app.post("/compare", async (req, res) => {
    const {password, hash} = req.body
    const isMatch = await bcryptjs.compare(password, hash)
    res.json({isMatch})
})




  app.post("/token", async (req, res) => {
    const {user} = req.body
    const token = await jwt.sign({userName: user}, secretKey, {expiresIn: "30s"})
    res.json({token})
  })