const express = require('express');
const router = express.Router();
const {config} = require('../helpers/db')
const mysql = require('mysql2/promise');
router.post('/login', async(req,res) => {
    const {username, password} = req.body
  try {

    let query = `select * from users where username = '${username}' and password = '${password}'`
    console.log(query)
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute(query);
    if(rows.length < 1) {
      return res.status(500).json({
        message: "No data",
        code: 1
      })
    }
    return res.status(200).json({
      data: rows,
      code: 0
    })
  } catch (error) {
    return res.status(500).json({
      message: "Loi",
      code: 1
    })
  }
})
module.exports = router