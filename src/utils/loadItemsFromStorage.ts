import { CartItem } from '../types/CartItem'

export const loadItemsFromStorage = (): CartItem[] => {
    const items: CartItem[] = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('shopping-list.')) {
            const id = parseInt(key.split('.')[1])
            const data = localStorage.getItem(key)
            if (data) {
                try {
                    const { amount, article } = JSON.parse(data)
                    items.push({ id, amount, articleName: article })
                } catch (e) {
                    console.error(key, e)
                }
            }
        }
    }
    return items
}
