import React, { FC } from 'react'
import './ImageRow.css'

type ImageRowProps = {
    images: string[]
}

const ImageRow: FC<ImageRowProps> = ({ images }) => {
    return (
        <div className="image-row">
            {images.map((imageUrl) => (
                <img key={imageUrl} src={imageUrl} alt="" className="image" />
            ))}
        </div>
    )
}

export default ImageRow
