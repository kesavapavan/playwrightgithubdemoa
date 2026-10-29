
import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly customerLoginButton: Locator;
    readonly managerLoginButton: Locator;
    readonly customerDropdown: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // Locators
        this.customerLoginButton =
            page.locator("button[ng-click='customer()']");

        this.managerLoginButton =
            page.locator("button[ng-click='manager()']");

        this.customerDropdown =
            page.locator('#userSelect');

        this.loginButton =
            page.getByText('Login', { exact: true });
    }

    // Open application
    async openApplication() {
        await this.page.goto(
            'https://www.globalsqa.com/angularJs-protractor/BankingProject/?utm_source=chatgpt.com#/login')
        
        
        
    }

    // Click Customer Login
    async clickCustomerLogin() {
        await this.customerLoginButton.click();
    }

    async clickManagerLogin() {
        await this.managerLoginButton.click()
    }

    // Select customer
    async selectCustomer(customerIndex: string) {
        await this.customerDropdown.selectOption(customerIndex);
    }

    // Click Login
    async clickLogin() {
        await this.loginButton.click();
    }
}
