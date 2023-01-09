import { Selector, t, ClientFunction } from 'testcafe';

fixture`check the price of product`
    .page`https://www.saucedemo.com/inventory.html`

test('Price should be $49.99', async t => {
    const priceSelector = Selector('.inventory_item_price');
    const priceText = await priceSelector.innerText;

    await t.expect(priceText).eql('$49.99');
});

fixture`Add Products to Cart`
    .page`https://www.saucedemo.com/inventory.html`

test('Add two products to cart', async f => {
    // Select the first product
    const firstProductSelector = Selector('.title').nth(0);
    // Find the add to cart button for the first product
    const firstAddToCartButton = firstProductSelector.find('.btn btn_primary btn_small btn_inventory');

    // Select the second product
    const secondProductSelector = Selector('.title').nth(1);

    // Find the add to cart button for the second product
    const secondAddToCartButton = secondProductSelector.find('.btn btn_primary btn_small btn_inventory');

    // Click the add to cart button for the first product
    await t.click(firstAddToCartButton);

    // Click the add to cart button for the second product
    await t.click(secondAddToCartButton);

    // Check that the cart count has increased by 2
    const cartCountSelector = Selector('.shopping_cart_badge');
    const cartCount = await cartCountSelector.innerText;
    await t.expect(cartCount).eql('2');

});

fixture`Click Cart Icon`
    .page`./`;

test('Click cart icon in top', async (t) => {
    // Select the cart icon
    const cartIconSelector = Selector('.shopping_cart_link');

    // Click the cart icon
    await t.click(cartIconSelector);

    // Check that the cart page has been opened
    const cartPageUrl = 'https://www.saucedemo.com/cart.html';
    await t.expect(await t.eval(() => window.location)).eql(cartPageUrl);
});

fixture`verify Items in cart`
    .page`https://www.saucedemo.com/cart.html`

test('Selected items are in cart', async t => {

    // Select the items you want to add to the cart
    await t
        .click(Selector('#cart_contents_container'))
        .click(Selector('#cart_contents_container'))

    // Verify that the items are in the cart
    const cartItems = Selector('.cart_list');
    await t.expect(cartItems.count).eql(2);
    await t.expect(cartItems.nth(0).textContent).contains('Sauce Labs Backpack');
    await t.expect(cartItems.nth(1).textContent).contains('Sauce Labs Bike Light');

});

fixture`verify checkout button`
    .page`https://www.saucedemo.com/checkout-step-one.html`

test('Click checkout button', async t => {

    await t.click(Selector('#checkout'));


});

//Random

const randomFirstName = ClientFunction(() => {
    const firstNames = ['mohamed'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
});

const randomLastName = ClientFunction(() => {
    const lastNames = ['afri'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
});

const randomZipCode = ClientFunction(() => {
    const zipCodes = ['91500'];
    return zipCodes[Math.floor(Math.random() * zipCodes.length)];
});

fixture`verify random firstname, lastname, age`
    .page`https://www.saucedemo.com/checkout-step-one.html`;

test('Provide a random first name, last name and a zip code in the next page', async t => {
    
    // Provide a random first name, last name, and zip code
    const firstNameField = Selector('#first-name');
    const lastNameField = Selector('#last-name');
    const zipCodeField = Selector('#postal-code');
    await t
        .typeText(firstNameField, await randomFirstName())
        .typeText(lastNameField, await randomLastName())
        .typeText(zipCodeField, await randomZipCode());

  

});

fixture `Verify continue `
    .page`https://www.saucedemo.com/checkout-step-one.html`

test ('Click continue', async t => {
      // Click the "Continue" button
      await t.click(Selector('#continue'));

});

fixture `Verify finish`
    .page`https://www.saucedemo.com/checkout-step-two.html`

test ('Click finish' , async t => {

    // Select the button element
    const finishButton = Selector('#finish');

    // Click the button
    await t.click(finishButton);

    // Assert that the button was clicked successfully
    await t.expect(finishButton.hasClass('clicked')).ok();

});