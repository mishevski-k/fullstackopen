const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((accumulator, blog) => {
            return accumulator + blog.likes;
        }, 0);
};

const mostPopular = (blogs) => {
    return blogs.length === 0
        ? {}
        : blogs.reduce((mostPopular, blog) => {
            return mostPopular.likes < blog.likes ? blog : mostPopular;
        });
};

module.exports ={
    dummy,
    totalLikes,
    mostPopular,
};