import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    likedSlots: [],
    isAuthenticated: false,
    userProfile: null
  }),
  actions: {
    initLikes() {
      if (process.client) {
        const stored = localStorage.getItem('sq_liked_slots')
        if (stored) {
          try {
            this.likedSlots = JSON.parse(stored)
          } catch(e) {
            console.error('Failed to parse liked slots', e)
          }
        }
      }
    },
    toggleLike(slotId) {
      if (!slotId) return
      const index = this.likedSlots.indexOf(slotId)
      if (index > -1) {
        this.likedSlots.splice(index, 1)
      } else {
        this.likedSlots.push(slotId)
      }
      
      // Persist to local storage (Future: Sync with Supabase DB)
      if (process.client) {
        localStorage.setItem('sq_liked_slots', JSON.stringify(this.likedSlots))
      }
    },
    isLiked(slotId) {
      return this.likedSlots.includes(slotId)
    }
  }
})
