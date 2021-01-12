const express = require('express');
const router = express.Router();
const {config} = require('../helpers/db')
const mysql = require('mysql2/promise');
router.post('/getById', async(req,res) => {
    const {id} = req.body
    try {
      let query = `select * from weather where id = ${id}`
      const connection = await mysql.createConnection(config);
      const [rows, fields] = await connection.execute(query);
      if(rows.length < 1) {
        return res.status(500).json({
          message: "No data"
        })
      }
      return res.status(200).json({
        data: rows
      })
    } catch (error) {
      return res.status(500).json({
        message: "Loi"
      })
    }
  })
router.get('/get', async(req,res) => {
    
    try {
      let query = `select * from weather`
      const connection = await mysql.createConnection(config);
      const [rows, fields] = await connection.execute(query);
      if(rows.length < 1) {
        return res.status(500).json({
          message: "No data"
        })
      }
      return res.status(200).json({
        data: rows
      })
    } catch (error) {
      return res.status(500).json({
        message: "Loi"
      })
    }
  })

module.exports = router;