import React, { useState } from 'react'

type CartItem = {
    id: number
    amount: number
    articleName: string
}

const initialCartItems: CartItem[] = []
const ShoppingCart = () => {
    const [articles, setArticles] = useState<CartItem[]>(initialCartItems)
    let upcomingId = articles.length
    const [addAmount, setAddAmount] = useState<number>(1)
    const [addItem, setAddItem] = useState<string>('')

    const handleRemove = (idToRemove: number) => {
        setArticles(articles.filter((article) => article.id !== idToRemove))
        upcomingId--
    }

    const addItemToList = (amountToAdd: number, articleToAdd: string) => {
        const insertAt = upcomingId
        const nextArticle = [
            ...articles.slice(0, insertAt),
            {
                id: upcomingId++,
                amount: amountToAdd,
                articleName: articleToAdd,
            },
            ...articles.slice(insertAt),
        ]
        setArticles(nextArticle)
    }

    return (
        <>
            <div className="shoppingList">
                <h1>Shopping List</h1>
                <ul>
                    <span>Amount </span>
                    <span>Item</span>
                    {articles.map((article) => (
                        <div key={article.id}>
                            <span>{article.amount} </span>
                            <span>{article.articleName} </span>
                            <button onClick={() => handleRemove(article.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </ul>
                <div>
                    Insert New Item To List:
                    <div>
                        <label>
                            Amount:
                            <input
                                type="number"
                                value={addAmount}
                                onChange={(e) =>
                                    setAddAmount(e.target.valueAsNumber)
                                }
                                min={1}
                            />
                        </label>
                        <label>
                            Item:
                            <input
                                type="text"
                                value={addItem}
                                onChange={(e) => setAddItem(e.target.value)}
                            />
                        </label>
                        <button
                            onClick={() =>
                                addItem.length &&
                                addAmount &&
                                addItemToList(addAmount, addItem)
                            }
                        >
                            Add Item To List
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
