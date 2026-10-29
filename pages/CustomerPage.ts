
import { type Page, type Locator } from '@playwright/test';

export class CustomerPage {

    readonly page: Page;
    readonly depositButton: Locator;
    readonly withdrawButton: Locator;
    readonly transactionsButton: Locator;
    readonly amountInput: Locator;
    readonly submitButton: Locator;
    readonly accountDropdown: Locator;

    constructor(page: Page) {

        this.page = page;

        // Account operations
        this.depositButton =
            page.locator("button[ng-click='deposit()']");

        this.withdrawButton =
            page.locator("button[ng-click='withdrawl()']");

        this.transactionsButton =
            page.locator("button[ng-click='transactions()']");

        this.amountInput =
            page.locator("input[ng-model='amount']");

        this.submitButton =
            page.locator("form button[type='submit']");

        this.accountDropdown =
            page.locator('#accountSelect');
    }

    // Select account
    async selectAccount(accountNumber: string) {
        await this.accountDropdown.selectOption(accountNumber);
    }

    // Deposit money
    async depositMoney(amount: string) {

        await this.depositButton.click();

        await this.amountInput.fill(amount);

        await this.submitButton.click();
    }

    // Withdraw money
    async withdrawMoney(amount: string) {

        await this.withdrawButton.click();

        await this.amountInput.fill(amount);

        await this.submitButton.click();
    }

    // View transactions
    async viewTransactions() {

        await this.transactionsButton.click();
    }

    // Get transaction table rows
    async getTransactionRows(): Promise<string[]> {

        return await this.page.locator('tbody tr').allInnerTexts();
    }


    async totalNoOfRows(rowsCount: Locator, totalrows: number): Promise<void> {
        let number = 0;

        while (number < totalrows) {

            const columns : Locator = rowsCount.nth(number).locator("td")

              let firstColumn  : string[] = await columns.nth(0).allInnerTexts()
            console.log(firstColumn)

            let secondColumn  : string[] = await columns.nth(1).allInnerTexts()
            console.log(secondColumn)

            let ThirdColumn  : string[] = await columns.nth(2).allInnerTexts()
            console.log(ThirdColumn)
            number++ 
        }
        console.log("Total count",number)
    }



   async takeScreenshot(fileName: string): Promise<void> {
        await this.page.screenshot({
            path: `tests/screenshots/${fileName}.png`,
            fullPage: true
        });
    }
}






