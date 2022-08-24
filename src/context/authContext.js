import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'

export const authContext = createContext()

// * Hook, exportando el contexto
export const useAuth = () => {
  const context = useContext(authContext)
  // ? Si no exite un context
  if (!context) throw Error('The is no auth provider')
  return context
}

// * Creando contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ? Registrar un nuevo usuario
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

  // ? Inicio de sesión usuario
  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  // ? Cerrar sesión usuario
  const logout = () => signOut(auth)

  // ? Iniciar sesión con google
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  // ? Restaurar password
  const resetPassword = email => sendPasswordResetEmail(auth, email)

  useEffect(() => {
    // ? Verifica si el usuario esta logueado
    const unsubcribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubcribe()
  }, [])
  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword
      }}
    >
      {children}
    </authContext.Provider>
  )
}
