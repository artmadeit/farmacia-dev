'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from 'react';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

type NavigationGuardContextType = {
    isDirty: boolean
    setIsDirty: (dirty: boolean) => void
    showDialog: (url: string) => void;
}

const NavigationGuardContext = createContext<NavigationGuardContextType>({
    isDirty: false,
    setIsDirty: () => { },
    showDialog: () => { }
})

export const NavigationGuardProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()

    const [isDirty, setIsDirty] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [pendingRoute, setPendingRoute] = useState<string | null>(null);

    // Handle browser navigation (refresh, close tab, etc.)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    const handleCancel = () => {
        setShowDialog(false);
        setPendingRoute(null);
    };

    const handleDiscard = () => {
        setShowDialog(false);
        if (pendingRoute) {
            setPendingRoute(null);
            setIsDirty(false);
            router.push(pendingRoute);
        }
    };

    return (
        <NavigationGuardContext.Provider value={{
            isDirty,
            setIsDirty,
            showDialog: (url: string) => {
                setPendingRoute(url);
                setShowDialog(true);
            }
        }}>
            {children}
            <UnsavedChangesDialog
                open={showDialog}
                onCancel={handleCancel}
                onDiscard={handleDiscard}
            />
        </NavigationGuardContext.Provider>
    )
}

export const useNavigationGuard = () => useContext(NavigationGuardContext)
