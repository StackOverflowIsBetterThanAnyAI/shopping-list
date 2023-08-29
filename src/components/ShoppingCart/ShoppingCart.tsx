import React, { useState } from 'react'
import ImageRow from '../ImageRow/ImageRow'

import './ShoppingCart.css'

import appleImage from '../../images/apple.png'
import cherryImage from '../../images/cherry.png'
import chickenImage from '../../images/chicken.png'
import cocktailImage from '../../images/cocktail.png'
import coffeeImage from '../../images/coffee.png'
import croissantImage from '../../images/croissant.png'
import icecreamImage from '../../images/icecream.png'
import jamImage from '../../images/jam.png'
import mcdonaldsImage from '../../images/mcdonalds.png'
import melonImage from '../../images/melon.png'
import muffinImage from '../../images/muffin.png'
import pancakeImage from '../../images/pancake.png'
import pizzaImage from '../../images/pizza.png'
import tacoImage from '../../images/taco.png'
import teaImage from '../../images/tea.png'

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

    const imageUrls = [
        appleImage,
        cherryImage,
        chickenImage,
        cocktailImage,
        coffeeImage,
        croissantImage,
        icecreamImage,
        jamImage,
        mcdonaldsImage,
        melonImage,
        muffinImage,
        pancakeImage,
        pizzaImage,
        tacoImage,
        teaImage,
    ]

    return (
        <>
            <div className="shoppingList">
                <h1>Shopping List</h1>
                <ImageRow images={imageUrls} />
                <ul className="shoppingList-gridContainer">
                    <span>Amount </span>
                    <span>Item</span>
                    {articles.map((article) => (
                        <li key={article.id} className="shoppingList-gridItem">
                            <span>{article.amount} </span>
                            <span>{article.articleName} </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(article.id)}
                            >
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
                        <button
                            type="button"
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
