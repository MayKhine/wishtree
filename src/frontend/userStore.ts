const kUserStorageKey = "UserStage"

export const getUser = () => {
  return localStorage.getItem(kUserStorageKey) as string
}

export const setUser = (str: string | null) => {
  if (str === null) {
    localStorage.removeItem(kUserStorageKey)
    return
  }
  localStorage.setItem(kUserStorageKey, str)
}

export const isLoggedIn = () => {
  return Boolean(getUser())
}
