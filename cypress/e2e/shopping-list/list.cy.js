describe('Shopping List - List', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('renders the image row', () => {
        cy.get('.image-row img').should('have.length', 15)
        cy.get('.image-row img').each((img) => {
            cy.wrap(img).should('have.attr', 'alt', '')
        })
    })

    it('stripes every second item and rounds only the last one', () => {
        cy.addItem(1, 'Banana')
        cy.addItem(2, 'Apples')
        cy.addItem(3, 'Pears')

        cy.get('.shoppingList-gridItem')
            .eq(0)
            .should('not.have.class', 'shoppingList-gridItem-striped')
        cy.get('.shoppingList-gridItem')
            .eq(1)
            .should('have.class', 'shoppingList-gridItem-striped')
        cy.get('.shoppingList-gridItem')
            .eq(2)
            .should('not.have.class', 'shoppingList-gridItem-striped')
        cy.get('.shoppingList-gridItem.borderRadiusBottom').should(
            'have.length',
            1
        )
        cy.get('.shoppingList-gridItem')
            .last()
            .should('have.class', 'borderRadiusBottom')
    })

    it('labels the list and its items for assistive technology', () => {
        cy.addItem(2, 'Apples')

        cy.get('ul').should(
            'have.attr',
            'aria-label',
            'Items added to Shopping List'
        )
        cy.get('.shoppingList-gridItem').should(
            'have.attr',
            'aria-label',
            '2 Apples'
        )
    })

    it('reindexes the items after removing one in the middle', () => {
        cy.addItem(1, 'Banana')
        cy.addItem(2, 'Apples')
        cy.addItem(3, 'Pears')

        cy.get('[data-testid="delete-1"]').click()

        cy.get('.shoppingList-gridItem').should(
            'have.text',
            '1Bananax+/-3Pearsx+/-'
        )
        cy.get('[data-testid="delete-2"]').should('not.exist')

        cy.addItem(4, 'Kiwis')
        cy.get('.shoppingList-gridItem').should(
            'have.text',
            '1Bananax+/-3Pearsx+/-4Kiwisx+/-'
        )
    })

    it('resets the header when the last item is removed', () => {
        cy.addItem(1, 'Banana')
        cy.get('[data-testid="delete-0"]').click()

        cy.get('ul').should('not.exist')
        cy.get('.shoppingList-gridItem-header').should(
            'have.class',
            'borderRadiusFull'
        )
    })
})
