const privileges = {
  isAdmin() {
    const role = localStorage.getItem('role')

    return role === 'admin'
  },
}

export default privileges
