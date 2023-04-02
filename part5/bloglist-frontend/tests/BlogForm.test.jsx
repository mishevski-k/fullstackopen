import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../src/components/BlogForm';

describe('<BlogForm />', () =>{
    let formContainer;
    let createBlog = vi.fn();
    beforeEach(() => {
        formContainer = render(
            <BlogForm createBlog={createBlog} />
        ).container;
    })
   
    it('Check if blog is created correctly', async () => {
        let user = userEvent.setup();
        let inputTitle = formContainer.querySelector('#blog-title');
        let inputAuthor = formContainer.querySelector('#blog-author');
        let inputUrl = formContainer.querySelector('#blog-url');
        let submit = screen.getByText('create');

        await user.type(inputTitle, "test title");
        await user.type(inputAuthor, "sudo");
        await user.type(inputUrl, "localhost");
        await user.click(submit);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('test title');
        expect(createBlog.mock.calls[0][0].author).toBe('sudo');
        expect(createBlog.mock.calls[0][0].url).toBe('localhost');
   });
});