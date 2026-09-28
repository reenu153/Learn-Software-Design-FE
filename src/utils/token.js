export function isTokenExpired(token) {
    if (!token) return true
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]))
      console.log(exp)
      return Date.now() >= exp * 1000
    } catch {
      return true
    }
  }