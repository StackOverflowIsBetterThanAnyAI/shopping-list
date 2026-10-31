describe('Shopping List - Edit', () => {
    const stubPrompt = (...answers) => {
        cy.window().then((win) => {
            const stub = cy.stub(win, 'prompt').as('prompt')
            answers.forEach((answer, index) =>
                stub.onCall(index).returns(answer)
            )
        })
    }

    beforeEach(() => {
        cy.visit('/')
        cy.addItem(2, 'Banana')
    })

    it('edits only the amount when clicking on it', () => {
        stubPrompt('7')
        cy.get('.shoppingList-gridItem span').eq(0).click()

        cy.get('@prompt').should('have.been.calledOnce')
        cy.get('.shoppingList-gridItem').should('have.text', '7Banana')
    })

    it('edits only the name when clicking on it', () => {
        stubPrompt('Cherries')
        cy.get('.shoppingList-gridItem span').eq(1).click()

        cy.get('@prompt').should('have.been.calledOnce')
        cy.get('.shoppingList-gridItem').should('have.text', '2Cherries')
    })

    it('prefills the prompts with the current values', () => {
        stubPrompt(null, null)
        cy.get('[data-testid="edit-0"]').click()

        cy.get('@prompt').should(
            'have.been.calledWith',
            Cypress.sinon.match.string,
            '2'
        )
        cy.get('@prompt').should(
            'have.been.calledWith',
            Cypress.sinon.match.string,
            'Banana'
        )
    })

    it('keeps the values when the prompts are cancelled', () => {
        stubPrompt(null, null)
        cy.get('[data-testid="edit-0"]').click()

        cy.get('.shoppingList-gridItem').should('have.text', '2Banana')
    })

    it('ignores invalid amounts', () => {
        stubPrompt('0', '-3', 'abc')
        cy.get('.shoppingList-gridItem span').eq(0).click()
        cy.get('.shoppingList-gridItem span').eq(0).click()
        cy.get('.shoppingList-gridItem span').eq(0).click()

        cy.get('@prompt').should('have.been.calledThrice')
        cy.get('.shoppingList-gridItem').should('have.text', '2Banana')
    })

    it('edits only the targeted item', () => {
        cy.addItem(3, 'Apples')
        stubPrompt('9', 'Pears')
        cy.get('[data-testid="edit-1"]').click()

        cy.get('.shoppingList-gridItem').should('have.text', '2Banana9Pears')
    })

    it('falls back per field when only one edit prompt is answered', () => {
        stubPrompt(null, 'Pears', '4', null)
        cy.get('[data-testid="edit-0"]').click()
        cy.get('.shoppingList-gridItem').should('have.text', '2Pears')

        cy.get('[data-testid="edit-0"]').click()
        cy.get('.shoppingList-gridItem').should('have.text', '4Pears')
    })

    it('truncates decimal amounts and updates the accessible names', () => {
        stubPrompt('3.7')
        cy.get('.shoppingList-gridItem span').eq(0).click()

        cy.get('.shoppingList-gridItem')
            .should('have.text', '3Banana')
            .and('have.attr', 'aria-label', '3 Banana')
        cy.get('[data-testid="delete-0"]').should(
            'have.attr',
            'aria-label',
            'Delete Item: 3 Banana'
        )
    })
})
