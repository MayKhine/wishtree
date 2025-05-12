import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react"
import { User } from "src/backend/domain/models/User"
import { getUserFromLocalStorage, setUserToLocalStorage } from "../userStore"

type UserContextState = {
  user: User | null
  setUser: (user: User | null) => void
}

const userContext = createContext<UserContextState | null>(null)

export const useUserContext = () => {
  const currentUser = useContext(userContext)
  if (currentUser == null)
    throw "Must be use withing a context of user provider"
  return currentUser
}

type UserProviderProps = PropsWithChildren

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, _setUser] = useState<User | null>(getUserFromLocalStorage())

  const setUser = useCallback(
    (user: User | null) => {
      setUserToLocalStorage(user)
      _setUser(user)
    },
    [_setUser],
  )

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}
