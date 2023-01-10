import { Selector } from 'testcafe';
const faker = require('js-faker');

fixture `Genarate fake data`
  .page `https://www.saucedemo.com/`;

test('Genarate fake data', async t => {
  // Generate a random name
  const name = faker.name.findName();

  // Enter the random name into the "name" field
  await t.typeText('#user-name', name);

  

  // Click the "login" button
  await t.click('#login-button');

  // Assert that the submitted form contains the random name and email
  await t.expect(Selector('#submitted-name').innerText).eql(name);
});
