// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useRef, useState } from 'react'
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
import ShoppingCartError from './ShoppingCartError'

type CartItem = {
    id: number
    amount: number
    articleName: string
}

const initialCartItems: CartItem[] = []

const imageUrls: string[] = [
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
    let upcomingId: number = articles.length

    // state variables for adding new items to the Shopping List
    const [addAmount, setAddAmount] = useState<number>(1)
    const [addItem, setAddItem] = useState<string>('')

    // is true if either no item or an invalid amount has been entered
    const [isValidAmount, setisValidAmount] = useState(true)
    const [isValidItem, setisValidItem] = useState(true)

    // update focus for input
    const inputRef = useRef<HTMLInputElement | null>(null)

    // remove item from Shopping List
    const handleRemove = (idToRemove: number) => {
        setArticles(articles.filter((article) => article.id !== idToRemove))
        upcomingId--
    }

    // edit item in Shopping List
    const handleEdit = (
        idToEdit: number,
        newAmount: number,
        newArticle: string
    ): void => {
        const updatedArticles: CartItem[] = articles.map((article) =>
            article.id === idToEdit
                ? { ...article, amount: newAmount, articleName: newArticle }
                : article
        )
        setArticles(updatedArticles)
    }

    const handleClick = (addAmount: number, addItem: string): void => {
        if (addItem.length && addAmount) addItemToList(addAmount, addItem)
        else if (!addItem.length && !addAmount) {
            setisValidItem(false)
            setisValidAmount(false)
        } else if (!addAmount) {
            setisValidItem(true)
            setisValidAmount(false)
        } else if (!addItem.length) {
            setisValidAmount(true)
            setisValidItem(false)
        }
    }

    // add new item to Shopping List
    const addItemToList = (amountToAdd: number, articleToAdd: string): void => {
        const insertAt: number = upcomingId
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
        setAddItem('')
        setAddAmount(1)
        if (inputRef.current) {
            inputRef.current.focus()
        }
        setisValidAmount(true)
        setisValidItem(true)
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
                                className="delete"
                                type="button"
                                onClick={() => handleRemove(article.id)}
                            >
                                X
                            </button>
                            <button
                                className="edit"
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
                            autoFocus
                            onChange={(e) =>
                                setAddAmount(e.target.valueAsNumber)
                            }
                            min={1}
                        />
                        <label>Item:</label>
                        <input
                            type="text"
                            value={addItem}
                            onChange={(e) => {
                                setAddItem(e.target.value)
                            }}
                            spellCheck={false}
                            ref={inputRef}
                        />
                        <button
                            className="add"
                            type="button"
                            onClick={() => {
                                handleClick(addAmount, addItem)
                            }}
                        >
                            Add Item
                        </button>
                    </div>
                    <ShoppingCartError
                        isValidAmount={isValidAmount}
                        isValidItem={isValidItem}
                    />
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
