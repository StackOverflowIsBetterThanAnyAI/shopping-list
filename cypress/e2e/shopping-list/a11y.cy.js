describe('Shopping List - Accessibility (WCAG 2.2)', () => {
    const viewports = {
        desktop: [1280, 800],
        mobile: [375, 667],
    }

    after(() => {
        cy.setColorScheme('light')
    })

    Object.entries(viewports).forEach(([device, [width, height]]) => {
        ;['light', 'dark'].forEach((scheme) => {
            it(`has no axe violations on ${device} in ${scheme} mode`, () => {
                cy.viewport(width, height)
                cy.setColorScheme(scheme)
                cy.visit('/')
                cy.checkA11y()

                cy.addItem(1, 'Banana')
                cy.addItem(2, 'Apples')
                cy.get('[id^="item-input-"]').type('Pears')
                cy.checkA11y()
            })
        })
    })

    it('provides a main landmark and a heading hierarchy', () => {
        cy.visit('/')

        cy.get('main').should('have.length', 1)
        cy.get('main h1').should('have.text', 'Shopping List')
        cy.get('main section')
            .should('have.attr', 'aria-labelledby', 'add-item-heading-desktop')
            .find('h2#add-item-heading-desktop')
            .should('have.text', 'Add a new item')
    })

    it('announces the number of items in a status message', () => {
        cy.visit('/')
        cy.get('[role="status"]').should('have.text', 'Your list is empty')

        cy.addItem(1, 'Banana')
        cy.get('[role="status"]').should('have.text', '1 item on your list')

        cy.addItem(2, 'Apples')
        cy.get('[role="status"]').should('have.text', '2 items on your list')

        cy.get('[data-testid="delete-0"]').click()
        cy.get('[data-testid="delete-0"]').click()
        cy.get('[role="status"]').should('have.text', 'Your list is empty')
    })

    it('gives every item button a unique accessible name', () => {
        cy.visit('/')
        cy.addItem(2, 'Apples')

        cy.get('[data-testid="delete-0"]').should(
            'have.attr',
            'aria-label',
            'Delete Item: 2 Apples'
        )
        cy.get('[data-testid="edit-0"]').should(
            'have.attr',
            'aria-label',
            'Edit Item: 2 Apples'
        )
        cy.get('.shoppingList-gridItem svg').each((icon) => {
            cy.wrap(icon).should('have.attr', 'aria-hidden', 'true')
        })
    })

    Object.entries(viewports).forEach(([device, [width, height]]) => {
        it(`meets the minimum target size of 24px on ${device} (2.5.8)`, () => {
            cy.viewport(width, height)
            cy.visit('/')
            cy.addItem(1, 'Banana')

            cy.get('button, input').each((element) => {
                const { width, height } = element[0].getBoundingClientRect()
                expect(width, element[0].outerHTML).to.be.at.least(24)
                expect(height, element[0].outerHTML).to.be.at.least(24)
            })
        })
    })

    it('shows a visible focus indicator on every interactive element (2.4.7)', () => {
        cy.visit('/')
        cy.addItem(1, 'Banana')
        // the add button is only focusable while an item name is entered
        cy.get('#item-input-desktop').type('Apples')

        cy.get('button, input').then((elements) => {
            Cypress._.times(elements.length, () => {
                cy.press(Cypress.Keyboard.Keys.TAB)
                cy.focused().should((element) => {
                    const { outlineStyle, outlineWidth } = getComputedStyle(
                        element[0]
                    )
                    expect(outlineStyle).not.to.equal('none')
                    expect(parseFloat(outlineWidth)).to.be.at.least(2)
                })
            })
        })
    })

    it('reflows at 320px without horizontal scrolling (1.4.10)', () => {
        cy.viewport(320, 640)
        cy.visit('/')
        cy.addItem(
            12,
            'Supercalifragilisticexpialidocious-oat-milk-without-any-spaces'
        )

        cy.document().should((doc) => {
            expect(doc.documentElement.scrollWidth).to.be.at.most(
                doc.documentElement.clientWidth
            )
        })
    })

    it('stays usable with text resized to 200% (1.4.4)', () => {
        cy.viewport(1280, 800)
        cy.visit('/')
        cy.addItem(1, 'Banana')
        cy.document().then((doc) => {
            doc.documentElement.style.fontSize = '200%'
        })

        cy.document().should((doc) => {
            expect(doc.documentElement.scrollWidth).to.be.at.most(
                doc.documentElement.clientWidth
            )
        })
        cy.get('button, input').each((element) => {
            cy.wrap(element).should('be.visible')
        })
    })
})
