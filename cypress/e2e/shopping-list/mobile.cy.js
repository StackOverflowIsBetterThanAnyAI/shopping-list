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

        cy.get('.shoppingList-gridItem').should('have.text', '3Lemons')
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

    it('edits and removes items on mobile', () => {
        cy.addItem(3, 'Lemons')
        cy.addItem(1, 'Limes')
        cy.window().then((win) => {
            cy.stub(win, 'prompt')
                .onFirstCall()
                .returns('6')
                .onSecondCall()
                .returns('Oranges')
        })

        cy.get('[data-testid="edit-0"]').click()
        cy.get('[data-testid="delete-1"]').click()

        cy.get('.shoppingList-gridItem').should('have.text', '6Oranges')
    })

    it('keeps the entered values when switching layouts', () => {
        cy.get('#amount-input-mobile').clear()
        cy.get('#amount-input-mobile').type('5')
        cy.get('#item-input-mobile').type('Kiwis')
        cy.viewport(1000, 660)

        cy.get('#amount-input-desktop').should('have.value', '5')
        cy.get('#item-input-desktop').should('have.value', 'Kiwis')
        cy.get('.add').should('have.attr', 'aria-label', 'Add Item: 5 Kiwis')
    })

    it('shows only the first ten images', () => {
        cy.get('.image-row img:visible').should('have.length', 10)
    })
})
