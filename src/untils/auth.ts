enum Keys {
  Token = 'token',
  UserId = 'userId',
  ExpireTime = 'expireTime',
}
export const setToken = (token: string) => {
  sessionStorage.setItem(Keys.Token, token)
}
export const getToken = () => (sessionStorage.getItem(Keys.Token) || '')

export const setUserId = (userId: number) => {
  sessionStorage.setItem(Keys.UserId, JSON.stringify(userId))
}
export const getUserId = () => (Number(sessionStorage.getItem(Keys.UserId)) || 0)

export const setExpireTime = (expireTime: number) => {
  sessionStorage.setItem(Keys.ExpireTime, JSON.stringify(expireTime))
}
export const getExpireTime = () => sessionStorage.getItem(Keys.ExpireTime)

export const clearSession = () =>  sessionStorage.clear()
