export const isAuthenticated = () => {
  let token = localStorage.getItem('token')
  let uid = localStorage.getItem('uid')
  let client = localStorage.getItem('client')

  // let decoded

  if (!token && !uid && !client) {
    return false
  } else return true
}
