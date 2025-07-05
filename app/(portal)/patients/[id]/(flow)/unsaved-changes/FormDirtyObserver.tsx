// components/FormObserver.tsx
'use client'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useNavigationGuard } from './NavigationGuard'

export const FormDirtyObserver = () => {
    const { dirty } = useFormikContext()
    const { setIsDirty } = useNavigationGuard()

    useEffect(() => {
        setIsDirty(dirty)
    }, [dirty, setIsDirty])

    return null
}
