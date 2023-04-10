export const typeDefs = `#graphql
type Query {
    apiStatus: ApiStatus
    users: [User]
    watchlists(user_id: Int!): [WatchList]
    showLists(user_id: Int!, list_id: Int!): [Show]
    reviews(show_id: Int!): [Review]
    reviewsFriends(user_id: Int!, show_id: Int!): [Review]
    likedShows(user_id: Int!, show_id: Int!): LikedShow
}

type Mutation {
    createUser(input: UserInput): ApiStatus
    createFriend(input: FriendInput): ApiStatus
    createWatchList(input: WatchListInput): ApiStatus
    updateFriend(input: FriendInput ): ApiStatus
    createReview(input: ReviewInput ): ApiStatus
    updateReview(input: ReviewInput ): ApiStatus
    createLikedShows(input: LikedShowInput ): ApiStatus
    updateLikedShows(input: LikedShowInput): ApiStatus
} 

type ApiStatus {
    status: String
}

input UserInput {
    name: String
    email: String
    password: String
}

input FriendInput {
    user_id_req: Int
    user_id_accept: Int
    answer: Int
}

input WatchListInput {
    user_id: Int
    list_name: String
    show_list: [Int]
}

input ReviewInput {
    user_id: Int
    show_id: Int
    title: String
    review_text: String
    is_edited: Boolean
    likes: Int
    dislikes: Int
    
}

input LikedShowInput {
    user_id: Int
    show_id: Int
    rating:  Int
}

type User {
    id: Int
    name: String
    email: String
    password: String
    
}

type WatchList {
    user_id: Int
    list_id: Int
    list_name: String
    is_edited: Boolean
    created_on: String
    updated_on: String
}

type Friend {
    user_id_accept: Int
    user_id_req: Int
    accepted: Boolean
}

type Show {
    show_id: Int
}

type Review {
  user_id:         Int       
  show_id:         Int       
  title:           String    
  review_text:     String
  likes:           Int       
  dislikes:        Int       
  is_edited:       Boolean   
  created_on:      String  
  updated_on:      String  
}

type LikedShow {
    user_id: Int
    show_id: Int
    rating: Int
}

`;
