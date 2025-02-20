const path = require('path')
const fs = require('fs')

// __dirname 是 node 的一个默认常量：当前目录
// 拼接的path是一个相对路径
const fileName = path.resolve(__dirname,'testdata.txt')

// 读取文件
fs.readFile(fileName,(err,data) => {
    if (err) {
        console.error(err)
        return
    }
    // data 是二进制文件，需要转换格式
    // data 读取了 file 的全部内容，会造成 内存的巨大压力
    fileData = data.toString()
    console.log(fileData)
})

// 写入文件
// const content = '========================\n'

// 写入的形式
const opt = {
    flag: 'a' // 追加写入，覆盖用 w
}
fs.writeFile(fileName , content , opt , (err) => {
    if (err) {
        console.error(err)
    }
})

// 文件是否存在

// 检查文件是否存在于当前目录中。
fs.access(fileName, fs.constants.F_OK, (err) => {
  console.log(`${fileName} ${err ? '不存在' : '存在'}`);
});
 
// 检查文件是否可读。
fs.access(fileName, fs.constants.R_OK, (err) => {
  console.log(`${fileName} ${err ? '不可读' : '可读'}`);
});
 
// 检查文件是否可写。
fs.access(fileName, fs.constants.W_OK, (err) => {
  console.log(`${fileName} ${err ? '不可写' : '可写'}`);
});
 
// 检查文件是否存在于当前目录中、以及是否可写。
fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${fileName} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
  } else {
    console.log(`${fileName} 存在，且可写`);
  }
});

// 缺省模式
fs.access(fileName, (err) => {
    console.log(`${fileName} ${err ? '不存在' : '存在'}`,'OK ');
  });