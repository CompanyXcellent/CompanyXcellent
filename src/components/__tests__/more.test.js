import React from "react";
import { HashRouter, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
const { validate } = require('./functions')



describe('Testing routing', () => {
    //?Derek1
    test('make sure that "/" renders landing page correctly', () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    //?Derek2
    test("make sure that '/team' renders team page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/team' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    //?Derek3
    test("make sure that '/profile/:id' renders profile/:id page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/profile/:id' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    //?Derek4
    test("make sure that '/messages' renders messages page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/messages' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    //?Derek5
    test("make sure that '/conversations/:id' renders conversations/:id page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/conversations/:id' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    // ? John 1
    test("make sure that '/add-conversation' renders add-conversation page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/add-conversation' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    // ? John 2
    test("make sure that '/employees' renders employees page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/employees' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    // ? John 3
    test("make sure that '/createPoll' renders createPoll page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/createPoll' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    // ? John 4
    test("make sure that '/posts' renders posts page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/posts' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    // ? John 5
    test("make sure that '/create-employee' renders create-employee page correctly", () => {
        const component = renderer.create(
            <HashRouter>
                <Link to='/create-employee' />
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    //!end ROUTE tests
});

describe("test New Employee", () => {
    test('will only accept new email address', () => {
        let errors;
        act(() => {
            errors = validate({ email: 'email not available'})
        })
        expect(errors.email).toBe('invalid email address')
    });

//     test('will only accept first Name longer than 3 characters', () => {
//         let errors;
//         act(() => {
//             errors = validate({ firstName: 'please no abbreviations'})
//         })
//         expect(errors.firstName).toBe('invalid email address')
//     });

//     test('will only accept last Name longer than 3 characters', () => {
//         let errors;
//         act(() => {
//             errors = validate({ lastName: 'last Name not available'})
//         })
//         expect(errors.lastName).toBe('invalid last Name address')
//     });

//     test('will only accept Job Title longer than 3 characters', () => {
//         let errors;
//         act(() => {
//             errors = validate({ jobTitle: 'job Title not available'})
//         })
//         expect(errors.jobTitle).toBe('invalid job Title address')
//     })
    
    //!
})