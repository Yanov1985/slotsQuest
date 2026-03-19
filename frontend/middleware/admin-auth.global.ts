export default defineNuxtRouteMiddleware(async (to) => {
  const isAdminRoute = to.path.startsWith('/admin')
  if (!isAdminRoute) {
    return
  }

  const isLoginPage = to.path === '/admin/login'
  const { ensureAdmin, isAuthenticated } = useAdminAuth()

  if (isLoginPage) {
    if (isAuthenticated.value) {
      return navigateTo('/admin')
    }

    const ok = await ensureAdmin()
    if (ok) {
      return navigateTo('/admin')
    }

    return
  }

  const ok = await ensureAdmin()
  if (!ok) {
    const redirect = encodeURIComponent(to.fullPath)
    return navigateTo(`/admin/login?redirect=${redirect}`)
  }
})

