export type BookType = {
    bookId : string
    imageLink : string
    smallImageLink : string 
    title : string
    authors : string[]
    description : string
    categories : string[]
    commentCount : number
    likeCount ?: number 
    likersId ?: string [] 
    rating ?: RatingType
    ratersId ?: string []
    collectorsId ?: string []
    wishlistersId ?: string []
    bookCoversInS3 : string[]
}
type RatingType = {
    1 : number,
    2 : number
    3 : number
    4 : number
    5 : number
}