import React, { FC } from 'react'
import './ImageRow.css'

type ImageRowProps = {
    images: string[]
}

const ImageRow: FC<ImageRowProps> = ({ images }) => {
    return (
        <div className="image-row">
            {images.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className="image"
                />
            ))}
        </div>
    )
}

export default ImageRow
