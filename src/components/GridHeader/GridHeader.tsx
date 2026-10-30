import { useContext } from 'react'
import './GridHeader.css'
import GridHeaderSpan from './GridHeaderSpan'
import { ContextArticles } from '../ShoppingCart/ShoppingCart'
import { useScreenWidth } from '../../hooks/useScreenWidth'

const GridHeader = () => {
    const contextArticles = useContext(ContextArticles)
    if (!contextArticles) {
        throw new Error(
            'ContextArticles must be used within a ContextArticles.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [articles, _setArticles] = contextArticles

    const screenWidth = useScreenWidth()

    return (
        <div
            className={`shoppingList-gridItem-header${
                articles.length > 0 ? ' borderRadiusTop' : ' borderRadiusFull'
            }`}
        >
            <GridHeaderSpan
                textCenter
                output={`${screenWidth === 'MOBILE' ? '#' : 'Amount'}`}
            />
            <GridHeaderSpan output="Item" />
            <GridHeaderSpan textCenter output="Remove" />
            <GridHeaderSpan textCenter output="Edit" />
        </div>
    )
}

export default GridHeader
