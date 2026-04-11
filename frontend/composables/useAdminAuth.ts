type AdminUser = {
  username: string
  role: 'super_admin'
}

type LoginResponse = {
  accessToken: string
  user: AdminUser
  expiresIn: number
}

export const useAdminAuth = () => {
  const config = useRuntimeConfig()
  const apiUrl = import.meta.client ? '' : (config.public.apiUrl || 'http://127.0.0.1:3001')

  const tokenCookie = useCookie<string | null>('admin_token', {
    sameSite: 'lax',
    secure: false,
    maxAge: 60 * 60 * 12
  })

  const adminUser = useState<AdminUser | null>('admin_user', () => null)
  const isAuthenticated = useState<boolean>('admin_is_authenticated', () => false)
  const authChecked = useState<boolean>('admin_auth_checked', () => false)

  const login = async (loginValue: string, password: string) => {
    const response = await $fetch<LoginResponse>(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      body: {
        login: loginValue,
        password
      }
    })

    tokenCookie.value = response.accessToken
    adminUser.value = response.user
    isAuthenticated.value = true
    authChecked.value = true

    return response
  }

  const validate = async () => {
    if (!tokenCookie.value) {
      adminUser.value = null
      isAuthenticated.value = false
      authChecked.value = true
      return false
    }

    try {
      const response = await $fetch<{ authenticated: boolean; user: AdminUser }>(
        `${apiUrl}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`
          }
        }
      )

      adminUser.value = response.user
      isAuthenticated.value = true
      authChecked.value = true
      return true
    } catch {
      tokenCookie.value = null
      adminUser.value = null
      isAuthenticated.value = false
      authChecked.value = true
      return false
    }
  }

  const ensureAdmin = async () => {
    if (isAuthenticated.value && tokenCookie.value) {
      return true
    }

    return validate()
  }

  const logout = () => {
    tokenCookie.value = null
    adminUser.value = null
    isAuthenticated.value = false
    authChecked.value = true
  }

  return {
    token: tokenCookie,
    adminUser,
    isAuthenticated,
    authChecked,
    login,
    validate,
    ensureAdmin,
    logout
  }
}

