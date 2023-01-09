import { Selector, t } from 'testcafe';
import LoginPage from '../PageObject/LoginPage';

fixture`Login Validation`
    .page`./`;

test('login scenario', async t => {
    
    LoginPage.login('performance_glitch_user','secret_sauce')
    await t  .expect(Selector(".title").innerText).eql('PRODUCTS')


});
