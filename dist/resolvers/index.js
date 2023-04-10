import { getFriendsReviews, getReviews, getShowsFromWatchList, getUsers, getWatchList, getRating, addUser, addFriend, addWatchList, updateFriend, addReview, addLikedShow, updateReview, updateLikedShows, } from '../utils.js';
export const resolvers = {
    Query: {
        apiStatus: () => {
            return {
                status: 'The API is working correctly',
            };
        },
        users: async () => getUsers(),
        watchlists: async (_, args) => getWatchList(args.user_id),
        showLists: async (_, args) => getShowsFromWatchList(args.user_id, args.list_id),
        reviews: async (_, args) => getReviews(args.show_id),
        reviewsFriends: async (_, args) => getFriendsReviews(args.user_id, args.show_id),
        likedShows: async (_, args) => getRating(args.user_id, args.show_id),
    },
    Mutation: {
        createUser: (parent, args, context, info) => addUser(args.input),
        createFriend: (_, args) => addFriend(args.input),
        updateFriend: (_, args) => updateFriend(args.input),
        createWatchList: (parent, args, context, info) => addWatchList(args.input),
        createReview: (_, args) => addReview(args.input),
        createLikedShows: (_, args) => addLikedShow(args.input),
        updateReview: (_, args) => updateReview(args.input),
        updateLikedShows: (_, args) => updateLikedShows(args.input),
    },
};
//context.res.cookie('new-cookie', { secure: false });
