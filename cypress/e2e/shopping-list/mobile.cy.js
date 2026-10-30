describe('Shopping List - Mobile', () => {
    beforeEach(() => {
        cy.viewport(375, 667)
        cy.visit('/')
    })

    it('renders the mobile layout', () => {
        cy.get('.shoppingList-gridItem-header').should(
            'have.text',
            '#ItemRemoveEdit'
        )
        cy.get('#amount-input-mobile').should('have.value', '1')
        cy.get('#item-input-mobile').should('have.value', '')
        cy.get('#amount-input-desktop').should('not.exist')
        cy.get('.shoppingList-addItemGridHeader')
            .next()
            .should('have.class', 'shoppingList-gridContainer')
    })

    it('adds items on mobile', () => {
        cy.get('#amount-input-mobile').clear()
        cy.get('#amount-input-mobile').type('3')
        cy.get('#item-input-mobile').type('Lemons')
        cy.get('.add').click()

        cy.get('.shoppingList-gridItem').should('have.text', '3Lemonsx+/-')
        cy.focused().should('have.id', 'item-input-mobile')
    })

    it('switches to the desktop layout when the viewport grows', () => {
        cy.viewport(1000, 660)

        cy.get('#amount-input-desktop').should('exist')
        cy.get('#amount-input-mobile').should('not.exist')
        cy.get('.shoppingList-gridItem-header').should(
            'have.text',
            'AmountItemRemoveEdit'
        )
    })
})
