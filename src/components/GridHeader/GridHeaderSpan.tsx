import { FC } from 'react'

type GridHeaderSpanProps = {
    output: string
    textCenter?: boolean
}

const GridHeaderSpan: FC<GridHeaderSpanProps> = ({ output, textCenter }) => {
    return (
        <span
            className={textCenter ? 'textAlignCenter' : undefined}
            aria-hidden="true"
        >
            {output}
        </span>
    )
}

export default GridHeaderSpan
