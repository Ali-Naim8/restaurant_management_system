import { useContext } from "react"
// useContext: A React hook used to access the value of a context.
import { AuthContext } from "../contexts/AuthProvider"


const useAuth = () => {
    const auth = useContext(AuthContext)
  return auth
}

export default useAuth

// useAuth is a custom React hook that provides access to authentication-related data stored in the AuthContext.
// It allows other components within the application to access this data easily without directly consuming the
// context themselves. This abstraction enhances code readability, maintainability, and reusability by encapsulating the
// logic for accessing authentication-related data into a custom hook.






