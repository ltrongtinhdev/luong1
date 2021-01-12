const express = require('express');
const router = express.Router();
const {config} = require('../helpers/db')
const mysql = require('mysql2/promise');
router.get('/news', async(req,res) => {
    
  try {

    let query = `select * from news`
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
router.get('/category', async(req,res) => {
    const {id} = req.params
    try {

        let query = `select * from category`
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
router.get('/news-category/:id', async(req,res) => {
    const {id} = req.params
    try {

        let query = `select * from news 
        where id_categories = ${id}`
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
router.get('/news/:id', async(req,res) => {
    const {id} = req.params
  try {

    let query = `select * from news 
    where id = ${id}`
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
