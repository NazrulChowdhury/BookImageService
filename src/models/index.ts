import { BookType } from "@types"
import mongoose, {Schema} from "mongoose"

const bookSchema = new Schema <BookType>({
    bookId : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    imageLink : {
        type : String,
        required : true
    }, 
    smallImageLink : {
        type : String,
        required : true
    }, 
    title : {  // index
        type : String,
        required : true,
        index : true
    },
    authors : {
        type : [String],
        required : true,
        index : true
    },
    description : { 
        type : String,
        required : true
    },
    categories : {
        type : [String],
        required : true,
        index : true
    },
    commentCount : {
        type : Number,
        default : 0
    },
    likeCount : {
        type : Number,
        default : 0
    },
    rating : {
        1 :{
            type : Number,
            default : 0
        },
        2 :{
            type : Number,
            default : 0
        },
        3 :{
            type : Number,
            default : 0
        },
        4 :{
            type : Number,
            default : 0
        },
        5 :{
            type : Number,
            default : 0
        },
    },
    likersId : {
        type : [String],
        default : []
    },
    ratersId :  {
        type : [String],
        default : []
    },
    collectorsId :  {
        type : [String],
        default : []
    },
    wishlistersId :  {
        type : [String],
        default : []
    },
    bookCoversInS3 : {
        type : [String],
        default : []
    }
})

export default mongoose.models?.Book || mongoose.model<BookType>('Book', bookSchema)

