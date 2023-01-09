import { Selector, t } from "testcafe";

class LoginPage{
    passwordInput: Selector;
    userNameInput: Selector;
    loginButton: Selector;
    constructor(){
        this.userNameInput = Selector('#user-name');
        this.passwordInput = Selector('#password');
        this.loginButton = Selector('#login-button')


    }

    async login (username: string , password: string){
        await t
        .typeText(this.userNameInput,username)
        .typeText(this.passwordInput,password)
        .click(this.loginButton);
    }

}

export default new LoginPage();