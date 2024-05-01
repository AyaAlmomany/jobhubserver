const express = require('express');
const app = express();
const port = 3000;
const dotenv= require('dotenv');
const mongoose=require('mongoose');
const jobRouter=require("./routes/job");
const authRouter=require("./routes/auth");
const appliedRouter=require("./routes/apply");
const userRoute=require("./routes/user");
const bodyParser=require("body-parser");
const cors =require('cors');
 app.use(cors());
dotenv.config();

const admin =require('firebase-admin');
const ServiceAccount=require('./ServicesAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});
 mongoose.connect(process.env.MONGO_URL)
   .then(()=> console.log('connect to jobhub'))
   .catch((err)=>console.log(err));

   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api/jobs',jobRouter);
    app.use('/api/user',userRoute);
    app.use('/api/',authRouter);
    app.use('/api/applied',appliedRouter);
app.get('/', (req, res) => {res.send('Hello World!')})

app.listen(process.env.PORT || port, () => {console.log(`the Hub is listening on port ${process.env.PORT}`)
})


//