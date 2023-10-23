const express = require('express')
const router = require('./routes/auth');
const cors = require('cors')
const app = express()
const port = 4000;
const host = 'localhost'

app.get('', (req, res) => {
	res.send({ message: 'Hello API' })
})
app.use(express.json())
app.use(cors())
app.use("/auth",router)
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
