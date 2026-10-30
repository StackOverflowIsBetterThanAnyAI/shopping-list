describe('Shopping List - Focus Trap', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.addItem(1, 'Banana')
        // the add button is only focusable while an item name is entered
        cy.get('#item-input-desktop').type('Apples')
    })

    it('moves focus from the last to the first element on Tab', () => {
        cy.get('.add').focus()
        cy.press(Cypress.Keyboard.Keys.TAB)

        cy.focused().should('have.attr', 'data-testid', 'delete-0')
    })

    it('moves focus from the first to the last element on Shift+Tab', () => {
        cy.get('[data-testid="delete-0"]').focus()
        cy.get('[data-testid="delete-0"]').trigger('keydown', {
            key: 'Tab',
            shiftKey: true,
        })

        cy.focused().should('have.class', 'add')
    })
})
