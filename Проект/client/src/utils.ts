import {FilteredPosts, Post} from "./types";

export function getFilteredPosts(posts: Array<Post>): FilteredPosts {
    if (posts.length > 0) {
        const temp = [...posts];
        const featured = temp.filter((item) => item.featured);
        const mainFeaturedPost = featured.length > 0 ? featured[getRandomInt(featured.length)] : undefined;
        if (featured.length > 1 ) {
            featured.slice(0);
        }
        const featuredPosts = featured;
        return {
            posts: temp.filter((item) => !item.featured),
            mainFeaturedPost,
            featuredPosts,
        }
    }
    else {
        return {
            featuredPosts: [],
            posts: [],
        }
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getShortDescription(description: string) {
    return description.length >= 185 ? `${description.substring(0, 184)} ...` : description;
}