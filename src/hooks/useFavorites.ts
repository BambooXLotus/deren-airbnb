import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { type SafeUser } from '~/types'

import useLoginModal from './useLoginModal'

type useFavoritesProps = {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: useFavoritesProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || []

    return favoriteIds.includes(listingId)
  }, [currentUser?.favoriteIds, listingId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request;
      let action = '❤️❤️❤️';

      if (hasFavorited) {
        action = '💔💔💔'
        request = () => axios.delete(`/api/favorites/${listingId}`)
      }
      else {
        request = () => axios.post(`/api/favorites/${listingId}`)
      }


      await request()

      router.refresh()
      toast.success(`${action}`)

    } catch (error) {
      toast.error('Somthing wong!!!')
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router])

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite
