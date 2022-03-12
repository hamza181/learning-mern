const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://hamza:asdfasdf@cluster0.e8pup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(url)
const connect=async()=>{
    try{
        await client.connect()
        return client.db('myFirstDatabase')
    }
    catch(err){
        console.log("err==>>",err)
    }
}

module.exports=connect