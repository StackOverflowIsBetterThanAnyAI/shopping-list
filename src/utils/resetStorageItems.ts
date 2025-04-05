import { CartItem } from '../types/CartItem'

export const resetStorageItems = (articles: CartItem[]) => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('shopping-list.')) {
            localStorage.removeItem(key)
        }
    })

    articles.forEach((article, index) => {
        localStorage.setItem(
            `shopping-list.${index}`,
            JSON.stringify({
                amount: article.amount,
                article: article.articleName,
            })
        )
    })
}
