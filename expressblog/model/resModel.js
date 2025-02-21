class BaseModel {
    constructor (data,message) {
        // data是 string ，则data是错误的类型，返回错误的信息，所以 this.message = data
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }

}


// SuccessModel and ErrorModel 格式化输出： error / message / data，正确的处理 data 是 array or object

class SuccessModel extends BaseModel {
    constructor(data,message ){
        super(data,message)
        this.error = 0
    }
}

class ErrorModel extends BaseModel {
    constructor (data,message) {
        super(data,message)
        this.error = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}

