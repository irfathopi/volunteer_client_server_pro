const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const port = 5000

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('volunteers'));
app.use(fileUpload());




const uri = `mongodb+srv://volunteersAdmin:Lo5lTwltEpokFfvu@cluster0.hrwsd.mongodb.net/volunteers?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
  res.send('Hello World!')
});



const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
      const VolunteerCollections = client.db("volunteers").collection("totalvolunteers");
  app.post('/addVolunteer', (req,res) => {
        const title = req.body.title;
        const date = req.body.date;
        const file = req.files.file;

        console.log(file, date, title);

        file.mv(`${__dirname}/volunteers/${file.name}`, err => {
          if(err){
            console.log(err);
            return res.status(500).send({msg: 'Failed to upload image'});
          }
          return res.send({name: file.name, path: `${file.name}`})

        })
      })
});

app.listen(process.env.PORT || port)