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

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {};
    }

    const authors = blogs.reduce((accumulator, blog) => {
        const foundBlog = accumulator.find(item => item.author === blog.author);
        if(foundBlog){
            foundBlog.blogs++;
        }else{
            const newAuthor = {
                author: blog.author,
                blogs: 1
            };
            accumulator.push(newAuthor);
        }
        return accumulator;
    }, []);

    return authors.reduce((accumulator, author) => {
        return accumulator.blogs < author.blogs ? author : accumulator;
    });
};

module.exports ={
    dummy,
    totalLikes,
    mostPopular,
    mostBlogs
};