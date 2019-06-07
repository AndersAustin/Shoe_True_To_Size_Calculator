const { Pool } = require("pg");
require("dotenv").config();

//instantiate the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'shoe_true_size',
  password: process.env.DB_PASS,
  port: 5432
});

//connect to database
pool.connect(err => {
  if (err) {
    console.log("error connecting to client at DB :", err);
  } else {
    console.log("connected to DB");
  }
});

//gets brands, will run on app load
const getAllBrands = (cb) => {
  pool.query(`SELECT brand_id, brand_name FROM brands;`, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
};

//gets shoes from a passed in brand, will run when brand is selected in app
const getShoesByBrand = (brand_id, cb) => {
  pool.query(`SELECT shoe_id, shoe_name FROM shoes where brand_id = $1;`, [brand_id], (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
};

//gets the sum of the shoe TTS entries and the amount of entries using selected shoe_id, will run when calculate is clicked
const getTTSEntriesByShoe = (shoe_id, cb) => {
  pool.query(`SELECT sum(true_to_size_entry) as sum, count(entry_id) as count FROM true_to_size_entries where shoe_id = $1;`, [shoe_id], (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
};

//inserts a new record into the true_to_size_entries database based on what is selected in app, will run when submit is clicked
const PostTTSEntriesByShoe = (shoe_id, TTSEntry, cb) => {
  pool.query(`INSERT INTO true_to_size_entries (shoe_id, true_to_size_entry) VALUES ($1, $2);`, [shoe_id, TTSEntry], (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
};

module.exports = { getAllBrands, getShoesByBrand, getTTSEntriesByShoe, PostTTSEntriesByShoe };