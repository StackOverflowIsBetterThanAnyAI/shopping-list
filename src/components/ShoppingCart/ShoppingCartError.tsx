import { FC } from 'react'
import { InfoIcon } from '../Icons/Icons'

type ErrorProps = {
    isValidAmount: boolean
    isValidItem: boolean
}

const ShoppingCartError: FC<ErrorProps> = ({ isValidAmount, isValidItem }) => {
    return !isValidAmount || !isValidItem ? (
        <div className="errorInput" role="alert">
            {!isValidAmount && (
                <div className="errorInput-message">
                    <InfoIcon />
                    You need to provide a valid amount of at least 1.
                </div>
            )}
            {!isValidItem && (
                <div className="errorInput-message">
                    <InfoIcon />
                    You need to provide a valid name for the item.
                </div>
            )}
        </div>
    ) : null
}

export default ShoppingCartError
