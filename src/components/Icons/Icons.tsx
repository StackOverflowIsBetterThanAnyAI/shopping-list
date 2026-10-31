import { FC, ReactNode } from 'react'

type IconProps = {
    children: ReactNode
}

// decorative only: the surrounding button provides the accessible name
const Icon: FC<IconProps> = ({ children }) => {
    return (
        <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    )
}

export const PlusIcon = () => (
    <Icon>
        <path d="M12 5v14M5 12h14" />
    </Icon>
)

export const PencilIcon = () => (
    <Icon>
        <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </Icon>
)

export const TrashIcon = () => (
    <Icon>
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
    </Icon>
)

export const InfoIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
    </Icon>
)
