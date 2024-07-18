import { useContext } from 'react'
import './GridHeader.css'
import GridHeaderSpan from './GridHeaderSpan'
import { ContextArticles } from '../ShoppingCart/ShoppingCart'

const GridHeader = () => {
    const contextArticles = useContext(ContextArticles)
    if (!contextArticles) {
        throw new Error(
            'ContextArticles must be used within a ContextArticles.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [articles, setArticles] = contextArticles

    return (
        <div
            className={`shoppingList-gridItem-header${
                articles.length > 0 ? ' borderRadiusTop' : ' borderRadiusFull'
            }`}
        >
            <GridHeaderSpan textCenter output="Amount" />
            <GridHeaderSpan output="Item" />
            <GridHeaderSpan textCenter output="Remove" />
            <GridHeaderSpan textCenter output="Edit" />
        </div>
    )
}

export default GridHeader
