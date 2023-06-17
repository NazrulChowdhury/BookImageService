import mongoose,{ ConnectOptions } from "mongoose"

export const connectMongo = async() => {

    try{
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser:true, 
                useUnifiedTopology:true
            } as ConnectOptions
        )
        console.log('db is connected')
    }catch(error : any){
        console.log(error)
        process.exit(1)
    }
}
export const disconnectMongo = async() => {
    try{
        await mongoose.connection.close()
        await mongoose.disconnect()
    } catch(error){
        console.log('failed to close db connection!')
    }
}
