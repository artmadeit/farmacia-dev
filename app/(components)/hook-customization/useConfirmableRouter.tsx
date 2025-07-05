'use client'
import { useNavigationGuard } from '@/app/(portal)/patients/[id]/(flow)/unsaved-changes/NavigationGuard'
import { useRouter } from 'next/navigation'

export function useConfirmableRouter() {
  const router = useRouter()
  const { isDirty, showDialog } = useNavigationGuard()

  const push = (href: string) => {
    if (isDirty) {
      showDialog(href)
    } else {
      router.push(href)
    }
  }

  return { push }
}
