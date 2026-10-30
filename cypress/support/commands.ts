/// <reference types="cypress" />

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            addItem(amount: number, item: string): Chainable<void>
        }
    }
}

Cypress.Commands.add('addItem', (amount: number, item: string) => {
    cy.get('#amount-input-desktop').clear()
    cy.get('#amount-input-desktop').type(String(amount))
    cy.get('#item-input-desktop').type(item)
    cy.get('.add').click()
})

export {}
