import React, { useState } from 'react'

const cartItems = [
    { id: 0, amount: 5, articleName: 'Banana' },
    { id: 1, amount: 2, articleName: 'Apple' },
    { id: 2, amount: 1, articleName: 'Milk' },
    { id: 3, amount: 2, articleName: 'Pizza' },
]
const ShoppingCart = () => {
    // TODO: add types and comments
    const [articles, setArticles] = useState(cartItems)
    let upcomingId = articles.length
    const [addAmount, setAddAmount] = useState<number>(1)
    const [addItem, setAddItem] = useState<string>('')

    const handleRemove = (idToRemove: number) => {
        setArticles(articles.filter((article) => article.id !== idToRemove))
        upcomingId--
    }

    const addItemToList = (amountToAdd: number, articleToAdd: string) => {
        console.log(amountToAdd, articleToAdd)

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
            <h1>Shopping List</h1>
            <ul>
                Amount Item
                {articles.map((article) => (
                    <li key={article.id}>
                        {article.amount} {article.articleName}{' '}
                        <button onClick={() => handleRemove(article.id)}>
                            Remove
                        </button>
                    </li>
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
                    <button onClick={() => addItemToList(addAmount, addItem)}>
                        Add Item To List
                    </button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
