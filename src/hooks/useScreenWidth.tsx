import { useEffect, useState } from 'react'

export const useScreenWidth = (): 'MOBILE' | 'NOT_MOBILE' => {
    const [screenWidth, setScreenWidth] = useState<'MOBILE' | 'NOT_MOBILE'>(
        'MOBILE'
    )

    useEffect(() => {
        const handleScreenWidth = () => {
            if (window.innerWidth < 768) {
                setScreenWidth('MOBILE')
            } else setScreenWidth('NOT_MOBILE')
        }
        window.addEventListener('resize', handleScreenWidth)
        handleScreenWidth()

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])

    return screenWidth
}
