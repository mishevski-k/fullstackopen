import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from '../src/components/Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
    let blogContainer;
    let handleUpdate = vi.fn();
    let handleDelete = vi.fn();
    const blog = {
        title: 'Testing Blog',
        author: 'sudo',
        url: 'localhost',
        likes: 3,
        user: {
            id: 1,
            name: 'sudo'
        }
    }

    beforeEach(() => {
        blogContainer = render(
            <Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        ).container;
    });
    
    it("Blog displaying header but not details", () => {

        let header = screen.getByText(`${blog.title} ${blog.author}`);
        let details = blogContainer.querySelector('.blog-item-body');

        expect(header).toBeDefined();
        expect(details).toHaveStyle('display: none');
    });

    it('Blog details visiable after button click', async () => {
        let user = userEvent.setup();
        let showButton = screen.getByText('show');
        await user.click(showButton);

        const details = blogContainer.querySelector('.blog-item-body');
        expect(details).not.toHaveStyle('display: none');
    });

    it("Blog likes button is called", async () => {
        let user = userEvent.setup();
        let likesButton = screen.getByText('like');
        await user.dblClick(likesButton);
        let likes = screen.getByText(`likes ${blog.likes + 2}`);

        expect(likes).toBeDefined();
        expect(handleUpdate.mock.calls).toHaveLength(2);
    });

});