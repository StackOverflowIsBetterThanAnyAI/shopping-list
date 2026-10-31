/// <reference types="cypress" />
import type { AxeResults, Result } from 'axe-core'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            addItem(amount: number, item: string): Chainable<void>
            checkA11y(): Chainable<void>
            setColorScheme(scheme: 'light' | 'dark'): Chainable<void>
        }
    }
}

// works for both the mobile and the desktop form
Cypress.Commands.add('addItem', (amount: number, item: string) => {
    cy.get('[id^="amount-input-"]').clear()
    cy.get('[id^="amount-input-"]').type(String(amount))
    cy.get('[id^="item-input-"]').type(item)
    cy.get('.add').click()
})

const formatViolations = (violations: Result[]) =>
    violations
        .map(
            ({ id, impact, help, nodes }) =>
                `[${impact}] ${id}: ${help}\n${nodes
                    .map((node) => `  - ${node.target.join(' ')}`)
                    .join('\n')}`
        )
        .join('\n')

// runs axe-core against the WCAG 2.2 A/AA rule set plus best practices
Cypress.Commands.add('checkA11y', () => {
    cy.readFile('node_modules/axe-core/axe.min.js', { log: false }).then(
        (source: string) => {
            cy.window({ log: false })
                .then((win) => {
                    win.eval(source)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (win as any).axe.run(win.document, {
                        runOnly: {
                            type: 'tag',
                            values: [
                                'wcag2a',
                                'wcag2aa',
                                'wcag21a',
                                'wcag21aa',
                                'wcag22aa',
                                'best-practice',
                            ],
                        },
                    }) as Promise<AxeResults>
                })
                .then(({ violations }) => {
                    expect(
                        violations,
                        formatViolations(violations) || 'no violations'
                    ).to.have.length(0)
                })
        }
    )
})

// only supported in Chromium based browsers (Chrome, Edge, Electron)
Cypress.Commands.add('setColorScheme', (scheme: 'light' | 'dark') => {
    cy.wrap(
        Cypress.automation('remote:debugger:protocol', {
            command: 'Emulation.setEmulatedMedia',
            params: {
                features: [{ name: 'prefers-color-scheme', value: scheme }],
            },
        }),
        { log: false }
    )
})

export {}
