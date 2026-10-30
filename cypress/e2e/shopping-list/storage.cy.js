describe('Shopping List - Storage', () => {
    const seedStorage = (entries) => ({
        onBeforeLoad(win) {
            Object.entries(entries).forEach(([key, value]) =>
                win.localStorage.setItem(key, value)
            )
        },
    })

    const storedItems = () =>
        cy.getAllLocalStorage().then((storage) => {
            const entries = Object.values(storage)[0] ?? {}
            return Object.fromEntries(
                Object.entries(entries)
                    .filter(([key]) => key.startsWith('shopping-list.'))
                    .map(([key, value]) => [key, JSON.parse(value)])
            )
        })

    it('loads only shopping list items from local storage', () => {
        cy.visit(
            '/',
            seedStorage({
                'shopping-list.0': JSON.stringify({
                    amount: 4,
                    article: 'Milk',
                }),
                'unrelated-key': 'ignored',
            })
        )

        cy.get('.shoppingList-gridItem').should('have.length', 1)
        cy.get('.shoppingList-gridItem').should('have.text', '4Milkx+/-')
    })

    it('skips corrupt entries in local storage', () => {
        cy.visit(
            '/',
            seedStorage({
                'shopping-list.0': JSON.stringify({
                    amount: 4,
                    article: 'Milk',
                }),
                'shopping-list.1': '{not json',
            })
        )

        cy.get('.shoppingList-gridItem').should('have.length', 1)
        cy.get('.shoppingList-gridItem').should('have.text', '4Milkx+/-')
    })

    it('appends new items after the stored ones', () => {
        cy.visit(
            '/',
            seedStorage({
                'shopping-list.0': JSON.stringify({
                    amount: 4,
                    article: 'Milk',
                }),
            })
        )
        cy.addItem(1, 'Bread')

        cy.get('.shoppingList-gridItem').should(
            'have.text',
            '4Milkx+/-1Breadx+/-'
        )
        storedItems().should('deep.equal', {
            'shopping-list.0': { amount: 4, article: 'Milk' },
            'shopping-list.1': { amount: 1, article: 'Bread' },
        })
    })

    it('persists edits and removals across reloads', () => {
        cy.visit('/')
        cy.addItem(1, 'Banana')
        cy.addItem(2, 'Apples')

        cy.window().then((win) => {
            cy.stub(win, 'prompt')
                .onFirstCall()
                .returns('5')
                .onSecondCall()
                .returns('Oranges')
        })
        cy.get('[data-testid="edit-1"]').click()
        cy.get('[data-testid="delete-0"]').click()

        storedItems().should('deep.equal', {
            'shopping-list.0': { amount: 5, article: 'Oranges' },
        })
        cy.reload()
        cy.get('.shoppingList-gridItem').should('have.text', '5Orangesx+/-')
    })
})
