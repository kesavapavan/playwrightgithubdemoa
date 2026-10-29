
import { test, expect, Locator } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { CustomerPage } from '../pages/CustomerPage';
import { ManagerPage } from '../pages/ManagerPage';

test('Banking application - Customer login and deposit', async ({ page }) => {

    // Create page class objects
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    // Open application
    await loginPage.openApplication();

    // Customer login
    await loginPage.clickCustomerLogin();

    // Select customer
    await loginPage.selectCustomer('1');

    // Click login
    await customerPage.takeScreenshot('before-login');
    await loginPage.clickLogin();
await customerPage.takeScreenshot('after-login');
    // Verify customer login
    await expect(page.getByText('Welcome')).toBeVisible();

    // Deposit money
    await customerPage.depositMoney('1000');
    await customerPage.takeScreenshot('deposit-money');
    // Verify deposit success
    await expect(page.getByText('Deposit Successful')).toBeVisible();
         
    

})

test('Banking application - View transactions', async ({ page }) => {

    // Create page class objects
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    await loginPage.openApplication();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('1');
    await loginPage.clickLogin();

    await customerPage.viewTransactions();

    await page.waitForTimeout(5000)


    const rowsCount: Locator = page.locator('tbody tr')

    const totalrows: number = await rowsCount.count()

    const rows: string[] = await customerPage.getTransactionRows();

    console.log(rows);

    await customerPage.totalNoOfRows(rowsCount, totalrows)

});

test('Banking application - Manager login and add Customer', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const managerPage = new ManagerPage(page);


    await loginPage.openApplication();
    await loginPage.clickManagerLogin();

    await managerPage.addCustomerm('Sujala', 'Polepalle', "500019")

})

test('Banking application - Manager - Open Account', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const managerPage = new ManagerPage(page);

    await loginPage.openApplication()
    await loginPage.clickManagerLogin()

    await managerPage.openAccountm("1", "Dollar")

})


test("Banking applications -Manager - Customer Details", async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const managerPage = new ManagerPage(page);

    await loginPage.openApplication()
    await loginPage.clickManagerLogin()
    
    

   

    await managerPage.searchCustomerAndEquas("Harry")

     const rows : Locator = page.locator("tbody tr")
    const managerTotalCount : number =  await rows.count()
    const ro : string[] = await managerPage.getTransactionRows()

    console.log(ro)

    await managerPage.managertotalNoOfRows(rows,managerTotalCount)

    

    



})



