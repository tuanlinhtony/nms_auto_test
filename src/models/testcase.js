const mongoose = require('mongoose')
const  validator = require('validator')

const testcaseSchema = new mongoose.Schema(
    {
        numberPos: {
            type: Number,
            required: true
        },
        testcaseID: {
            type: String,
            required: true
        },
        testingScope: {
            type: String,
            required: true
        },
        expectedResult: {
            type: String,
            default: "12"
        },
        receivedResult: {
            type: String,
            default: "Chưa có"
        },
        testResult: {
            type: String,

        },
        status: {
            type: String,
            default: "Đang chờ" //0: Đang chờ, 1: Đang test, 2: Tạm dừng, 3: Đạt, 4: Không đạt
        },
        asignDev: {
            type: String,
            default: "null"
        }
    }
    ,
    {
        timestamps: true
    }
)

const Testcase = mongoose.model('Testcase', testcaseSchema)

module.exports = Testcase