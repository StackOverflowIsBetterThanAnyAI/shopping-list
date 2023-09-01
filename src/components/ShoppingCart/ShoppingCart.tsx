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
import GridHeader from '../GridHeader/GridHeader'

type CartItem = {
    id: number
    amount: number
    articleName: string
}

const initialCartItems: CartItem[] = []

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
].sort(() => 0.5 - Math.random())

const ShoppingCart = () => {
    // initial Shopping List is empty
    const [articles, setArticles] = useState<CartItem[]>(initialCartItems)
    let upcomingId = articles.length

    // state variables for adding new items to the Shopping List
    const [addAmount, setAddAmount] = useState<number>(1)
    const [addItem, setAddItem] = useState<string>('')

    // remove item from Shopping List
    const handleRemove = (idToRemove: number) => {
        setArticles(articles.filter((article) => article.id !== idToRemove))
        upcomingId--
    }

    // TODO: edit item in Shopping List
    const handleEdit = (
        idToEdit: number,
        newAmount: number,
        newArticle: string
    ) => {
        const updatedArticles = articles.map((article) =>
            article.id === idToEdit
                ? { ...article, amount: newAmount, articleName: newArticle }
                : article
        )
        setArticles(updatedArticles)
    }

    // add new item to Shopping List
    const addItemToList = (amountToAdd: number, articleToAdd: string) => {
        const insertAt = upcomingId
        const nextArticle = [
            ...articles.slice(0, insertAt),
            {
                id: upcomingId++,
                amount: amountToAdd,
                articleName: articleToAdd,
                bought: false,
            },
            ...articles.slice(insertAt),
        ]
        setArticles(nextArticle)
    }

    return (
        <>
            <div className="shoppingList">
                <h1>Shopping List</h1>
                <ImageRow images={imageUrls} />
                <ul className="shoppingList-gridContainer">
                    <GridHeader />
                    {articles.map((article) => (
                        <li key={article.id} className="shoppingList-gridItem">
                            <span
                                className="textAlignCenter"
                                onClick={() => {
                                    let newAmount = parseInt(
                                        prompt(
                                            'Enter the new amount or cancel to leave it the same:',
                                            article.amount.toString()
                                        ) || article.amount.toString()
                                    )
                                    if (isNaN(newAmount) || newAmount < 1)
                                        newAmount = article.amount
                                    handleEdit(
                                        article.id,
                                        newAmount,
                                        article.articleName
                                    )
                                }}
                            >
                                {article.amount}
                            </span>
                            <span
                                onClick={() => {
                                    const newArticle =
                                        prompt(
                                            'Enter a new article name or cancel to leave it the same:',
                                            article.articleName
                                        ) || article.articleName
                                    handleEdit(
                                        article.id,
                                        article.amount,
                                        newArticle
                                    )
                                }}
                            >
                                {article.articleName}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(article.id)}
                            >
                                Remove
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    let newAmount = parseInt(
                                        prompt(
                                            'Enter the new amount or cancel to leave it the same:',
                                            article.amount.toString()
                                        ) || article.amount.toString()
                                    )
                                    if (isNaN(newAmount) || newAmount < 1)
                                        newAmount = article.amount
                                    const newArticle =
                                        prompt(
                                            'Enter a new article name or cancel to leave it the same:',
                                            article.articleName
                                        ) || article.articleName
                                    handleEdit(
                                        article.id,
                                        newAmount,
                                        newArticle
                                    )
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="shoppingList-addItemGridHeader">
                    Add A New Item To The List:
                    <div className="shoppingList-addItemGrid">
                        <label>Amount:</label>
                        <input
                            type="number"
                            value={addAmount}
                            onChange={(e) =>
                                setAddAmount(e.target.valueAsNumber)
                            }
                            min={1}
                        />
                        <label>Item:</label>
                        <input
                            type="text"
                            value={addItem}
                            onChange={(e) => setAddItem(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                addItem.length &&
                                    addAmount &&
                                    addItemToList(addAmount, addItem)
                                setAddItem('')
                                setAddAmount(1)
                            }}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
