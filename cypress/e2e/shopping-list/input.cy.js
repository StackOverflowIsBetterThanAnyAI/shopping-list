describe('Shopping List - Input', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('focuses the amount input on load', () => {
        cy.focused().should('have.id', 'amount-input-desktop')
    })

    it('disables the add button without an item name', () => {
        cy.get('.add').should('be.disabled')
        cy.get('#item-input-desktop').type('Banana')
        cy.get('.add').should('be.enabled')
        cy.get('#item-input-desktop').clear()
        cy.get('.add').should('be.disabled')
    })

    it('disables the add button without a valid amount', () => {
        cy.get('#item-input-desktop').type('Banana')
        cy.get('#amount-input-desktop').clear()
        cy.get('.add').should('be.disabled')
        cy.get('#amount-input-desktop').type('0')
        cy.get('.add').should('be.disabled')
        cy.get('.shoppingList-gridItem').should('not.exist')
    })

    it('resets the inputs and focuses the item input after adding', () => {
        cy.addItem(3, 'Banana')

        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').should('have.value', '')
        cy.focused().should('have.id', 'item-input-desktop')
        cy.get('.errorInput').should('not.exist')
    })

    it('reflects the current input in the add button label', () => {
        cy.get('#amount-input-desktop').clear()
        cy.get('#amount-input-desktop').type('4')
        cy.get('#item-input-desktop').type('Kiwis')
        cy.get('.add').should('have.attr', 'aria-label', 'Add Item: 4 Kiwis')
    })
})
