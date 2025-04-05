export const setItemInStorage = (
    id: number,
    amount: number,
    article: string
) => {
    const key = `shopping-list.${id}`
    const value = JSON.stringify({ amount, article })
    localStorage.setItem(key, value)
}
