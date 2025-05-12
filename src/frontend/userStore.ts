import { User } from "src/backend/domain/models/User"

const kUserStorageKey = "UserStage"

export const getUserFromLocalStorage = (): User | null => {
  const userStr = localStorage.getItem(kUserStorageKey)
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const setUserToLocalStorage = (user: User | null) => {
  if (user === null) {
    localStorage.removeItem(kUserStorageKey)
    return
  }
  localStorage.setItem(kUserStorageKey, JSON.stringify(user))
}
