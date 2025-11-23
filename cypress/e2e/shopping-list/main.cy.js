describe('Shopping List', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('renders the site correctly', () => {
        cy.get('h1').should('have.text', 'Shopping List')
        cy.get('.shoppingList-gridItem-header')
            .last()
            .should('have.text', 'AmountItemRemoveEdit')
        cy.get('.shoppingList-gridItem-header')
            .last()
            .should('have.class', 'borderRadiusFull')
        cy.get('.shoppingList-gridItem').should('not.exist')
        cy.get('.shoppingList-addItemGrid-description')
            .first()
            .should('have.text', 'Add A New Item To The List:')
        cy.get('.shoppingList-addItemGrid').should(
            'have.text',
            'Amount:Item:Add Item'
        )
        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').should('have.text', '')
    })

    it('adds the correct item and amount', () => {
        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').type('Banana')
        cy.get('.add').click()

        cy.get('.shoppingList-gridItem').should('have.length', '1')
        cy.get('.shoppingList-gridItem').should('have.text', '1BananaX+/-')
        cy.get('.shoppingList-gridItem').should(
            'have.class',
            'borderRadiusBottom'
        )
        cy.get('.shoppingList-gridItem-header')
            .last()
            .should('have.class', 'borderRadiusTop')

        cy.get('#amount-input-desktop').clear()
        cy.get('#amount-input-desktop').type('2')
        cy.get('#item-input-desktop').type('Apples')
        cy.get('.add').click()

        cy.get('.shoppingList-gridItem').should('have.length', '2')
        cy.get('.shoppingList-gridItem').should(
            'have.text',
            '1BananaX+/-2ApplesX+/-'
        )
    })

    it('stores the items during page reload', () => {
        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').type('Banana')
        cy.get('.add').click()
        cy.get('#amount-input-desktop').clear()
        cy.get('#amount-input-desktop').type('2')
        cy.get('#item-input-desktop').type('Apples')
        cy.get('.add').click()
        cy.reload()

        cy.get('.shoppingList-gridItem').should('have.length', '2')
        cy.get('.shoppingList-gridItem').should(
            'have.text',
            '1BananaX+/-2ApplesX+/-'
        )
    })

    it('removes the correct item and amount', () => {
        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').type('Banana')
        cy.get('.add').click()
        cy.get('#amount-input-desktop').clear()
        cy.get('#amount-input-desktop').type('2')
        cy.get('#item-input-desktop').type('Apples')
        cy.get('.add').click()

        cy.get('[data-testid="delete-0"]').click()

        cy.get('.shoppingList-gridItem').should('have.length', '1')
        cy.get('.shoppingList-gridItem').should('have.text', '2ApplesX+/-')
    })

    it('updates to the correct item and amount', () => {
        cy.get('#amount-input-desktop').should('have.value', '1')
        cy.get('#item-input-desktop').type('Banana')
        cy.get('.add').click()

        cy.window().then((win) => {
            cy.stub(win, 'prompt')
                .onFirstCall()
                .returns('5')
                .onSecondCall()
                .returns('Oranges')
        })
        cy.get('[data-testid="edit-0"]').click()

        cy.get('.shoppingList-gridItem').should('have.text', '5OrangesX+/-')
    })
})
