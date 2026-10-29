import { type Page, type Locator } from '@playwright/test';

export class ManagerPage {

    readonly page: Page;
    readonly addCustomer: Locator;
    readonly firstNameAddCustomer: Locator;
    readonly lastNameAddCustomer: Locator;
    readonly postalCodeAddCustomer: Locator;
    readonly submitAddCustomer: Locator;
    readonly openaccount : Locator
    readonly customerOpenAccount : Locator;
    readonly currencyOpenAccount : Locator;
    readonly processOpenAccount : Locator;
    readonly customerH : Locator
    readonly searchInputV : Locator
    


    constructor(page: Page) {

        this.page = page

        this.addCustomer = page.locator("button[ng-click='addCust()']")

        this.firstNameAddCustomer = page.getByPlaceholder("First Name")

        this.lastNameAddCustomer = page.getByPlaceholder("Last Name")

        this.postalCodeAddCustomer = page.getByPlaceholder("Post Code")

        this.submitAddCustomer = page.getByRole('form').getByRole('button', { name: 'Add Customer' })

        this.openaccount = page.locator("button[ng-click='openAccount()']")

        this.customerOpenAccount = page.locator("select[name='userSelect']")
        
        this.currencyOpenAccount = page.locator("select[name='currency']")

        this.processOpenAccount = page.getByText("Process")

        this.customerH = page.locator("button[ng-click='showCust()']")

        this.searchInputV = page.locator("input[ng-model='searchCustomer']")


    }

    async addCustomerm(firstName: string, lastName: string, postalCode: string) {

        await this.addCustomer.click()
        await this.firstNameAddCustomer.fill(firstName)
        await this.lastNameAddCustomer.fill(lastName)
        await this.postalCodeAddCustomer.fill(postalCode)
        await this.managealerts()
        await this.submitAddCustomer.click()
    }

    async openAccountm(customeropenAccount : string,currecnyOpenAccount : string)
    {
        await this.openaccount.click()
        await this.customerOpenAccount.selectOption(customeropenAccount)
        await this.currencyOpenAccount.selectOption(currecnyOpenAccount)
        await this.managealerts()
        await this.processOpenAccount.click()




    }


    async searchCustomerAndEquas(inputSearchs : string){

        await this.customerH.click()
        await this.searchInputV.fill(inputSearchs)
 }



 async managertotalNoOfRows(rowsCount: Locator, totalrows: number): Promise<void> {

        let number = 0;
        let searchInpu : string = await this.searchInputV.inputValue()

        while (number < totalrows) {

            const columns : Locator = rowsCount.nth(number).locator("td")

              let searchFirstColumn  : string = await columns.nth(0).innerText()
            

            let searchSecondColumn  : string = await columns.nth(1).innerText()
            

            let searchThirdColumn  : string = await columns.nth(2).innerText()
        
            let searchFourthColumn  : string = await columns.nth(3).innerText()
            



            if(searchInpu === searchFirstColumn  )
        {
            console.log("FirstName : ", searchFirstColumn, "LastName : ",
                searchSecondColumn , "PostCode : ",searchThirdColumn
                , "Account Number : " , searchFourthColumn )
                break
            
        }
            number++ 
        }
       
    }


    async getTransactionRows(): Promise<string[]> {

        return await this.page.locator('tbody tr').allInnerTexts();
    }





    async managealerts(){
         this.page.on('dialog', async dialog => {
            // Verify it's the expected alert type
            console.log(`Dialog type: ${dialog.type()}`); // "alert"

            // Verify the alert message text
            console.log(`Alert text: ${dialog.message()}`);

            // Accept the alert (clicks OK)
            await dialog.accept();
        });
    }



}