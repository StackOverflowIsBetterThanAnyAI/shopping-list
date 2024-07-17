import { FC } from 'react'

type ErrorProps = {
    isValidAmount: boolean
    isValidItem: boolean
}

const ShoppingCartError: FC<ErrorProps> = ({ isValidAmount, isValidItem }) => {
    return !isValidAmount || !isValidItem ? (
        <div className="errorInput">
            {!isValidAmount && (
                <div>
                    &#128712; You need to provide a valid Amount of at least 1.
                </div>
            )}
            {!isValidItem && (
                <div>
                    &#128712; You need to provide a valid name for the Item.
                </div>
            )}
        </div>
    ) : null
}

export default ShoppingCartError
