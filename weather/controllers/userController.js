const {pool} = require('../helpers/db')

const config = require('../helpers/config')
const db = require('../helpers/db')
const login = async(req,res,next)=> {
    const {userName,password} = req.body //get duwx liệu body client 
    const query = `
        select * from users where username  = '${userName}'
        and password = '${password}'
    ` // viêt quẻy
    console.log(query)
    db.pool.query(query, //thực thi query
        (err, rows, fields) => {
            if(err) {
                return res.status(500).json({
                    code: 2,
                    messagae: "Lỗi không kết nối được với db",
                })
            }
            if(rows.length < 1) {
                return res.status(500).json({
                    code: 1,
                    messagae: "Khong co user nao",
                }) 
            }

            return res.status(200).json({
                code: 0,
                data: rows,
                messagae: "success",
            })
        }  
    )
    
    
}
const register = async(req,res,next)=> {
    const {userName,password,fullName} = req.body
    const query = `
        select * 
        from users 
        where username = '${userName}'
    `
    const queryInsert = `
    INSERT INTO users(
        username, fullname, password)
        VALUES ('${userName}','${fullName}','${password}');
    `// cũng như vậy
    db.pool.query(query,
        (err, rows, fields) => {
            if(err) {
                return res.status(500).json({
                    code: 2,
                    messagae: "Lỗi không kết nối được với db"
                })
            }
            if(rows.length > 0) {
                return res.status(500).json({
                    code: 1,
                    messagae: "da co user nay"
                })
            }
            //check qua đc hết các cái trên , như vậy nha
            db.pool.query(queryInsert,
                (err, rows, fields) => {
                    if(err) {
                        return res.status(500).json({
                            code: 2,
                            messagae: "Lỗi không kết nối được với db"
                        })
                    }
                    return res.status(200).json({
                        code: 0,
                        messagae: "success"
                    })
                }  
            )
            
        }  
    )
}
module.exports = {
    login,
    register
}