import React from "react";
import { HashRouter, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import axios from 'axios'
import Team from '../Team/Team'
import promise from "redux-promise-middleware";
// import { testUsersInfo } from "./functions";
const { createPost, getEmployeeRating, testingGetTeamEndpoint, testingGetPosts, testGetPoll, testPostPoll, testResponses, testUsersInfo } = require("./functions");

describe("Testing routing", () => {
  //?Derek1
  test('make sure that "/" renders landing page correctly', () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //?Derek2
  test("make sure that '/team' renders team page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/team" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //?Derek3
  test("make sure that '/profile/:id' renders profile/:id page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/profile/:id" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //?Derek4
  test("make sure that '/messages' renders messages page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/messages" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //?Derek5
  test("make sure that '/conversations/:id' renders conversations/:id page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/conversations/:id" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ? John 1
  test("make sure that '/add-conversation' renders add-conversation page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/add-conversation" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ? John 2
  test("make sure that '/employees' renders employees page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/employees" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ? John 3
  test("make sure that '/createPoll' renders createPoll page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/createPoll" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ? John 4
  test("make sure that '/posts' renders posts page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/posts" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ? John 5
  test("make sure that '/create-employee' renders create-employee page correctly", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to="/create-employee" />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //!end ROUTE tests
});

//! endpoints test thanjarvis
describe("createPost", () => {
  it("this should be a function", () => {
    expect(typeof createPost).toBe("function");
  });

  //important------------these tests depend on the backend so the server MUST be running for it to pass
  it('testing getEmployeeRating endpoint ', async () => {
    const answer = await getEmployeeRating()
    expect(typeof answer[0]).toBe('object')
  });

  it(' testing the team enpoint', async () => {
    const testVal = await testingGetTeamEndpoint()
    expect(typeof testVal).toBe('object')
  });

  it('testing functionality on the get posts endpoints', async () => {
    const posts = await testingGetPosts()
    expect(posts[0].user_id).toBe(1)
  });

  it('testing functionality of the backend get poll enpoint', async () => {
    const poll = await testGetPoll()
    expect(poll[12].question).toBe('')
  })

});

//? Ryan's tests
describe('tests the polls', () => {
  it('posts the polls', async () => {
    const questions = await testPostPoll()
    expect(typeof questions).toBe('object')
  })
  it('submits the poll responses', async () => {
    const responses = await testResponses()
    expect(responses[0].question).toBe('Efficiency:')
  })
});

describe(`tests the user's data`, () => {
  it('get the user nickname', async () => {
    const userInfo = await testUsersInfo()
    expect(userInfo.nickname).toBe('alienkiller47')
  })
})