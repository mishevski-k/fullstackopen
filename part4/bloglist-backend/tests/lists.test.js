const listHelper = require('../utils/list_helper');

const mostPopularBlog = {
    _id: '0983261b54a6767623624d1717',
    title: 'Most popular blog',
    author: 'Kiril Mishevski',
    url: 'http://localhost:3001',
    likes: 34,
    __v: 0
};

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    },
    mostPopularBlog
];

const emptyList = [];
const listWithOfOneBlog = [
    {
        _id: '1',
        title: 'Blog 1',
        author: 'Kiril Mishevski',
        url: 'localhost:3001',
        likes: 5,
        __v: 0
    }
];

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes(emptyList)).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOfOneBlog)).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(70);
    });
});

describe('most popular', () => {
    test('of empty list is zero', () => {
        expect(listHelper.mostPopular(emptyList)).toEqual({});
    });

    test('when list has only one blog equals to that blog', () => {
        expect(listHelper.mostPopular(listWithOfOneBlog)).toEqual(listWithOfOneBlog[0]);
    });

    test('of a bigger list to equal to with most likes', () => {
        expect(listHelper.mostPopular(blogs)).toEqual(mostPopularBlog);
    });
});

describe('most blogs', () => {
    test('of empty list is empty', () => {
        expect(listHelper.mostBlogs(emptyList)).toEqual({});
    });

    test('when list has only one blog equals to that author', () => {
        expect(listHelper.mostBlogs(listWithOfOneBlog)).toEqual(
            {
                author: 'Kiril Mishevski',
                blogs: 1
            });
    });
    
    test('of bigger list to equal to author with most blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            }
        );
    });
});

describe('most likes', () => {
    test('of empty list is empty', () => {
        expect(listHelper.mostLikes(emptyList)).toEqual({});
    });

    test('when list has only one blog equals to that author', () => {
        expect(listHelper.mostLikes(listWithOfOneBlog)).toEqual(
            {
                author: 'Kiril Mishevski',
                likes: 5
            }
        );
    });

    test('of bigger list to equal to author with most likes', () => {
        expect(listHelper.mostLikes(blogs)).toEqual(
            {
                author: 'Kiril Mishevski',
                likes: 34
            }
        );
    });
});