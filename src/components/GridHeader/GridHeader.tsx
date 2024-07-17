import './GridHeader.css'
import GridHeaderSpan from './GridHeaderSpan'

const GridHeader = () => {
    return (
        <div className="shoppingList-gridItem-header">
            <GridHeaderSpan textCenter output="Amount" />
            <GridHeaderSpan output="Item" />
            <GridHeaderSpan textCenter output="Remove" />
            <GridHeaderSpan textCenter output="Edit" />
        </div>
    )
}

export default GridHeader
