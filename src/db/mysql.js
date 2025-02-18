const mysql = require('mysql2')
const { MYSQL_CONF } = require('../config/db')

// 创建连接对象
const conn = mysql.createConnection(MYSQL_CONF)

// 开始连接
conn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + conn.threadId);
  })
  // 最简单的方式
  // conn.connect()


  // 统一执行 SQL的函数
  function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        conn.query(sql, (err,result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise 
  }

  //返回
  module.exports = {
    exec
  }