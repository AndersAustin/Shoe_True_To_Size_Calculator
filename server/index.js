const express = require('express');
const app = express();
const db = require('../database/db.js');
const CORS = require('cors');

app.use(express.json({urlencoded: true}));
app.use(CORS())
app.use(express.static('dist'));


app.get(`/brands`, (req, res) => {
  db.getAllBrands((err, data) => {
    if (err) {
      // console.log(err);
      res.status(403).end();
    } else {
      // console.log(data);
      res.send(data);
    }
  })
});

app.get(`/shoes`, (req, res) => {
  const brand_id = req.query.brand_id
  db.getShoesByBrand(brand_id, (err, data) => {
    if (err) {
      // console.log(err);
      res.status(403).end();
    } else {
      // console.log(data);
      res.send(data);
    }
  })
});

app.post(`/TTSEntries`, (req, res) => {
  const shoe_id = req.body.shoe_id
  const TTSEntry = req.body.TTSEntry

  if (!shoe_id || TTSEntry === 0) {
    res.status(400).end();
  } else {
    db.PostTTSEntriesByShoe(shoe_id, TTSEntry, (err, data) => {
      if (err) {
        // console.log(err);
        res.status(403).end();
      } else {
        res.end();
      }
    })
  }
});

app.get(`/TTSAverages`, (req, res) => {
    const shoe_id = req.query.shoe_id
    if (shoe_id === 'undefined') {
        res.status(400).end();
    } else {
      db.getTTSEntriesByShoe(shoe_id, (err, data) => {
        if (err) {
          // console.log(err);
          res.status(403).end();
        } else {
          // console.log(data);
          res.send(data);
        }
      })

    }
  })

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err, res) => {
  if (err) {
    console.log('error when connecting to server', err); 
  } else {
    console.log('successfully connected to server at port 8000');      
  }
})
