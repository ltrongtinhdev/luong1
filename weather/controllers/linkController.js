const {pool} = require('../helpers/db')

const config = require('../helpers/config')
let Parser = require('rss-parser');
var cheerio = require('cheerio');

let parser = new Parser();


const vnexpressRSS = async(req,res, next) => {
    
    Promise.all(
        [
            parser.parseURL('https://vnexpress.net/rss/giai-tri.rss'),
            parser.parseURL('https://vnexpress.net/rss/thoi-su.rss')
        ]
        
    ).then(([feed1,feed2]) => {
        
        const dataArr1 = feed1.items.map((e,i) => {
            if(i < 13) {
                var $ = cheerio.load(e.content)
                let headContents=$('img')[0].attribs.src; 
                return {
                    ...e,
                    img: headContents
                }
           }
        })
        return res.json({
            code: 0,
            data: dataArr1.filter(Boolean)
        })
    }).catch((e) => {
        next(e)
    })

  
}
const h24RSS = async(req,res, next) => {
    
    Promise.all(
        [
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/thoitranghitech.rss'),
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/suckhoedoisong.rss'),
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/lamdep.rss')
        ]
    ).then(([feed,feed1,feed2]) => {
        const dataArr = feed.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr1 = feed1.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr2 = feed2.items.map((e,i) =>{
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataRs = dataArr.concat(dataArr1).concat(dataArr2).filter(Boolean)
        return res.json({
            code: 0,
            data: dataRs
        })
    }).catch((e) => {
        next(e)
    })

  // như nhau em muốn viết dan trí thì chỉ cần copy ra
}
// thằng này hình như k có rss
const tinhteRSS = async(req,res, next) => { /// thằng này nó không chia danh mục đơi sống chỉ có 1 rss thì chỉ cần như vầy
    // Promise sẽ gọi đồng thời 3 link này
    // các parser có nhiệm vụ parser html sang json
    Promise.all(
        [
            parser.parseURL('https://tinhte.vn/rss'),
        ]
        // 3 cái này tương ứng với 3 cái kết quả trả về của  3 link. Nếu như 1 trong 3 lỗi thì nó chạy vào catch luôn.
    ).then(([feed]) => {
        // chỉ khi nào mà thành công cả 3 thì nó mới vào phần then
        
        const dataArr = feed.items.map((e,i) => {
            var $ = cheerio.load(e.author)
            // thằng này mất dạy bỏ trong author
            let headContents=$('img')[0]; // hàm này nó sẽ check hết cái $ có phần tag html là img khôg
            console.log("headContents",headContents)
        })
        console.log('dsa')
        dataArr = []// kệ đi mệt quá :D mò :D
        //feed không có img
        // array ban đầu feed sẽ chưa có giá trị img
        // let headContents=$('img')[0].attribs.src;
        // if(i < 4) {
        //     delete e.content
        //     return {
        //         ...e,
        //         img: headContents
        //     }
           
        // }
        //sử dụng hàm này để lấ 4 giá trị đầu của  feed, let headContents=$('img')[0].attribs.src; sẽ lấy đc giá trị của img
        // taokj ra 1 arr chỉ có 4 phần tử
        
        //4 nữa
        const dataRs = dataArr.filter(Boolean)// sẽ là 12 ptuwr filter(Boolean) các phần tử null, underfile sẽ bị mất đi
        return res.json({
            code: 0,
            data: dataRs // sau đó truyền về client
        })
    }).catch((e) => {
        return res.status(500).json({
            code: 1,
            
        })
    })

  
}
//req viết tắt của request -> các dữ liệu client đưa lên sv ,
//res viết tắt response -> dữ liệu sv đưa về client
// next là callback gọi tiếp tục nó như là có gọi 1 func nào đó nữa hoặc là return cái gì đó  nhưng mà nếu e viêt return thì tất cả lệnh phía dưới return sẽ không hoạt đông
// trong javascrpit thì nó như vậy nên hàm next không cần thiết e thích e xoá cũng đc
const tuoitreRSS = async(req,res) => {
    // Promise sẽ gọi đồng thời 3 link này
    // các parser có nhiệm vụ parser html sang json
    Promise.all(
        [
            parser.parseURL('https://tuoitre.vn/rss/tin-moi-nhat.rss'),
            parser.parseURL('https://tuoitre.vn/rss/nhip-song-so.rss'),
            parser.parseURL('https://tuoitre.vn/rss/the-gioi.rss')
        ]
        // 3 cái này tương ứng với 3 cái kết quả trả về của  3 link. Nếu như 1 trong 3 lỗi thì nó chạy vào catch luôn.
    ).then(([feed,feed1,feed2]) => {
        // chỉ khi nào mà thành công cả 3 thì nó mới vào phần then
        
        const dataArr = feed.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        //feed không có img
        // array ban đầu feed sẽ chưa có giá trị img
        // let headContents=$('img')[0].attribs.src;
        // if(i < 4) {
        //     delete e.content
        //     return {
        //         ...e,
        //         img: headContents
        //     }
           
        // }
        //sử dụng hàm này để lấ 4 giá trị đầu của  feed, let headContents=$('img')[0].attribs.src; sẽ lấy đc giá trị của img
        // taokj ra 1 arr chỉ có 4 phần tử
        const dataArr1 = feed1.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })

        //4 phần tử nữa
        const dataArr2 = feed2.items.map((e,i) =>  {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        //4 nữa
        const dataRs = dataArr.concat(dataArr1).concat(dataArr2).filter(Boolean)// sẽ là 12 ptuwr filter(Boolean) các phần tử null, underfile sẽ bị mất đi
        return res.json({
            code: 0,
            data: dataRs // sau đó truyền về client
        })
    }).catch((e) => {
        return res.status(500).json({
            code: 1,
            
        })
    })
 /// khi vào trong này thì có những cái hàm này trả về dữ liệu cho ng dùng thì nó sẽ trả về cho ng dùng
  
}


module.exports = {
    vnexpressRSS,
    tuoitreRSS,
    h24RSS,
    tinhteRSS
}