// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
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
import { CartItem } from '../../types/CartItem'
import { loadItemsFromStorage } from '../../utils/loadItemsFromStorage'
import { resetStorageItems } from '../../utils/resetStorageItems'
import { setItemInStorage } from '../../utils/setItemInStorage'
import { useScreenWidth } from '../../hooks/useScreenWidth'

const initialCartItems: CartItem[] = []

const imageUrls: string[] = [
    appleImage,
    cherryImage,
    chickenImage,
    cocktailImage,
    coffeeImage,
    croissantImage,
    melonImage,
    jamImage,
    mcdonaldsImage,
    icecreamImage,
    muffinImage,
    pancakeImage,
    pizzaImage,
    tacoImage,
    teaImage,
]

export const ContextArticles = createContext<
    [CartItem[], Dispatch<SetStateAction<CartItem[]>>] | undefined
>(undefined)

const ShoppingCart = () => {
    const [articles, setArticles] = useState<CartItem[]>(initialCartItems)
    const [upcomingId, setUpcomingId] = useState<number>(articles.length)

    const [addAmount, setAddAmount] = useState<number>(1)
    const [addItem, setAddItem] = useState<string>('')

    // is true if either no item or an invalid amount has been entered
    const [isValidAmount, setisValidAmount] = useState(true)
    const [isValidItem, setisValidItem] = useState(true)

    // update focus for input
    const inputRef = useRef<HTMLInputElement | null>(null)

    // detects if the current viewport is mobile width
    const screenWidth = useScreenWidth()

    const handleRemove = (idToRemove: number) => {
        const updatedArticles = articles
            .filter((article) => article.id !== idToRemove)
            .map((article, index) => ({ ...article, id: index }))
        setArticles(updatedArticles)
        resetStorageItems(updatedArticles)
        setUpcomingId((prev) => prev - 1)
    }

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
        resetStorageItems(updatedArticles)
    }

    const handleClick = (addAmount: number, addItem: string): void => {
        if (addItem.length && addAmount) {
            addItemToList(addAmount, addItem)
        } else if (!addItem.length && !addAmount) {
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

    const addItemToList = (amountToAdd: number, articleToAdd: string): void => {
        const insertAt: number = upcomingId
        const newId = upcomingId
        setUpcomingId((prev) => prev + 1)

        const nextArticle = [
            ...articles.slice(0, insertAt),
            {
                id: newId,
                amount: amountToAdd,
                articleName: articleToAdd,
                bought: false,
            },
            ...articles.slice(insertAt),
        ]
        setItemInStorage(insertAt, amountToAdd, articleToAdd)
        setArticles(nextArticle)
        setAddItem('')
        setAddAmount(1)
        if (inputRef.current) {
            inputRef.current.focus()
        }
        setisValidAmount(true)
        setisValidItem(true)
    }

    useEffect(() => {
        const storedItems = loadItemsFromStorage()
        setArticles(storedItems)
        setUpcomingId(storedItems.length)
    }, [])

    useEffect(() => {
        const handleFocusTrap = (e: KeyboardEvent) => {
            const focusableButtons = Array.from(
                document.querySelectorAll<HTMLElement>('button, input')
            )
            const firstButton = focusableButtons[0]
            const lastButton = focusableButtons[focusableButtons.length - 1]

            if (
                e.key === 'Tab' &&
                !e.shiftKey &&
                document.activeElement === lastButton
            ) {
                e.preventDefault()
                firstButton?.focus()
            }

            if (
                e.key === 'Tab' &&
                e.shiftKey &&
                document.activeElement === firstButton
            ) {
                e.preventDefault()
                lastButton?.focus()
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [])

    return (
        <>
            <ContextArticles.Provider value={[articles, setArticles]}>
                <div className="shoppingList">
                    <h1>Shopping List</h1>
                    <ImageRow images={imageUrls} />
                    {screenWidth === 'MOBILE' && (
                        <div className="shoppingList-addItemGridHeader">
                            <div className="shoppingList-addItemGrid">
                                <div className="shoppingList-addItemGrid-description">
                                    Add A New Item To The List:
                                </div>
                                <div className="gridRow">
                                    <label htmlFor="amount-input-mobile">
                                        Amount:
                                    </label>
                                    <input
                                        id="amount-input-mobile"
                                        type="number"
                                        value={addAmount}
                                        autoFocus
                                        onChange={(e) =>
                                            setAddAmount(e.target.valueAsNumber)
                                        }
                                        min={1}
                                    />
                                </div>
                                <div className="gridRow">
                                    <label htmlFor="item-input-mobile">
                                        Item:
                                    </label>
                                    <input
                                        id="item-input-mobile"
                                        type="text"
                                        placeholder="Banana"
                                        value={addItem}
                                        onChange={(e) => {
                                            setAddItem(e.target.value)
                                        }}
                                        spellCheck={false}
                                        ref={inputRef}
                                    />
                                </div>
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
                    )}
                    <ul className="shoppingList-gridContainer">
                        <GridHeader />
                        {articles.map((article, index) => (
                            <li
                                key={article.id}
                                className={`shoppingList-gridItem${
                                    index === articles.length - 1
                                        ? ' borderRadiusBottom'
                                        : ''
                                }${
                                    index % 2 === 1
                                        ? ' shoppingList-gridItem-striped'
                                        : ''
                                }`}
                            >
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
                                    data-testid={`delete-${article.id}`}
                                    type="button"
                                    onClick={() => handleRemove(article.id)}
                                >
                                    X
                                </button>
                                <button
                                    className="edit"
                                    data-testid={`edit-${article.id}`}
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
                                    +/-
                                </button>
                            </li>
                        ))}
                    </ul>
                    {screenWidth === 'NOT_MOBILE' && (
                        <div className="shoppingList-addItemGridHeader">
                            <div className="shoppingList-addItemGrid-description">
                                Add A New Item To The List:
                            </div>
                            <div className="shoppingList-addItemGrid">
                                <label htmlFor="amount-input-desktop">
                                    Amount:
                                </label>
                                <input
                                    id="amount-input-desktop"
                                    type="number"
                                    value={addAmount}
                                    autoFocus
                                    onChange={(e) =>
                                        setAddAmount(e.target.valueAsNumber)
                                    }
                                    min={1}
                                />
                                <label htmlFor="item-input-desktop">
                                    Item:
                                </label>
                                <input
                                    id="item-input-desktop"
                                    type="text"
                                    placeholder="Banana"
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
                    )}
                </div>
            </ContextArticles.Provider>
        </>
    )
}

export default ShoppingCart
