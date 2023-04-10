import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getUsers = async () => {
    const users = await prisma.user.findMany({});
    return users;
};
export const getFriends = async (user_id) => {
    const friends = await prisma.friend.findMany({
        where: {
            OR: [
                {
                    user_id_accept: user_id,
                },
                {
                    user_id_req: user_id,
                },
            ],
            AND: {
                accepted: true,
            },
        },
    });
    const returnFriends = [];
    friends.map((item) => {
        if (item.user_id_accept != user_id) {
            returnFriends.push(item.user_id_accept);
        }
        else {
            returnFriends.push(item.user_id_req);
        }
    });
    return returnFriends;
};
export const getWatchList = async (user_id) => {
    const list = await prisma.showList.findMany({
        where: {
            user_id: user_id,
        },
    });
    return list;
};
export const getShowsFromWatchList = async (user_id, list_id) => {
    const shows = await prisma.show2ShowList.findMany({
        where: {
            user_id: user_id,
            list_id: list_id,
        },
    });
    const showList = [];
    shows.map((item) => {
        showList.push({ show_id: item.show_id });
    });
    return showList;
};
export const getReviews = async (show_id) => {
    const reviews = await prisma.review.findMany({
        where: {
            show_id: show_id,
        },
    });
    /* const reviewList = [];
    reviews.map((item) => {
      reviewList.push({
        user_id: item.user_id,
        title: item.title,
        review_text: item.review_text,
      });
      
    }); */
    return reviews;
};
export const getFriendsReviews = async (user_id, show_id) => {
    const user_list = await getFriends(user_id);
    const reviews = await prisma.review.findMany({
        where: {
            user_id: { in: user_list },
            show_id: show_id,
        },
    });
    /* const reviewList = [];
    reviews.map((item) => {
      reviewList.push({
        user_id: item.user_id,
        title: item.title,
        review_text: item.review_text,
      });
    }); */
    return reviews;
};
export const getRating = async (user_id, show_id) => {
    const rating = await prisma.likedShow.findUnique({
        where: {
            user_id_show_id: {
                user_id: user_id,
                show_id: show_id,
            },
        },
    });
    return { rating: rating.rating };
};
export const addUser = async (input) => {
    const check = await prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });
    if (check === null) {
        //console.log('if');
        await prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                password: input.password,
            },
        });
        return { status: 'User Added sucessfully' };
    }
    else {
        //console.log('else');
        return { status: 'The email is already taken' };
    }
};
// *TODO: NEED TO COMPLETE THE FUNCTION, JUST ADDES THE BASIC PRSIMA STUFF
export const addFriend = async (input) => {
    const check = await prisma.friend.create({
        data: {
            user_id_req: input.user_id_req,
            user_id_accept: input.user_id_accept,
        },
    });
    if (check) {
        return { status: 'Friend Added sucessfully' };
    }
    else {
        return { status: 'Friend Not Added!' };
    }
};
export const addWatchList = async (input) => {
    const list_number = await prisma.showList.count({
        where: {
            user_id: input.user_id,
        },
    });
    //console.log(list_number);
    const lst = [];
    input.show_list.map((item) => {
        lst.push({ show_id: item });
    });
    //console.log(lst);
    const check = await prisma.showList.create({
        data: {
            user_id: input.user_id,
            list_name: input.list_name,
            list_id: list_number + 1,
            show_list_id: {
                create: lst,
            },
        },
    });
    if (check) {
        return { status: 'WatchList Added sucessfully' };
    }
    else {
        return { status: 'WatchList Not Added!' };
    }
};
export const updateFriend = async (input) => {
    if (input.answer === 1) {
        //If Friend Request Accepted
        await prisma.friend.update({
            where: {
                user_id_req_user_id_accept: {
                    user_id_accept: input.user_id_accept,
                    user_id_req: input.user_id_req,
                },
            },
            data: {
                accepted: true,
            },
        });
        return { status: 'Friend Request Accepted' };
    }
    else if (input.answer === 0) {
        await prisma.friend.delete({
            where: {
                user_id_req_user_id_accept: {
                    user_id_accept: input.user_id_accept,
                    user_id_req: input.user_id_req,
                },
            },
        });
        return { status: 'Friend Request Rejected' };
    }
};
export const addReview = async (input) => {
    const check = await prisma.review.create({
        data: {
            user_id: input.user_id,
            title: input.title,
            show_id: input.show_id,
            review_text: input.text,
        },
    });
    if (check) {
        return { status: 'Review Added' };
    }
    else {
        return { status: 'No Review Added' };
    }
};
export const updateReview = async (input) => {
    const check = await prisma.review.update({
        data: {
            likes: input.likes != null ? { increment: input.likes } : undefined,
            dislikes: input.dislikes != null ? { increment: input.dislikes } : undefined,
            title: input.title || undefined,
            review_text: input.review_text || undefined,
        },
        where: {
            user_id_show_id: {
                user_id: input.user_id,
                show_id: input.show_id,
            },
        },
    });
    if (check) {
        return { status: 'Review Updated' };
    }
    else {
        return { status: 'No Update Was Done' };
    }
};
export const addLikedShow = async (input) => {
    const check = await prisma.likedShow.create({
        data: {
            user_id: input.user_id,
            show_id: input.show_id,
            rating: input.rating,
        },
    });
    if (check) {
        return { status: 'Liked Show Added' };
    }
    else {
        return { status: 'No Liked Show' };
    }
};
export const updateLikedShows = async (input) => {
    const check = await prisma.likedShow.update({
        data: { rating: input.rating },
        where: {
            user_id_show_id: {
                user_id: input.user_id,
                show_id: input.show_id,
            },
        },
    });
};
//const friends = await getFriends(3);
//console.log(await getShowsFromWatchList(2, 2));
/* export const getUser = async () => {
  const query = `
    SELECT * FROM users;
    `;
  readQuery(query);
};
 */
