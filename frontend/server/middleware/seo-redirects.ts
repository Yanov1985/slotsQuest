export default defineEventHandler((event) => {
  const host = getRequestHeader(event, 'host') || ''
  const path = event.path // raw path with search params

  // 1. Check for 'www.' prefix
  let newHost = host
  let hasWww = false
  if (host.startsWith('www.')) {
    newHost = host.slice(4)
    hasWww = true
  }

  // 2. Check for trailing slash
  const [pathname, search] = path.split('?')
  let newPathname = pathname
  let hasTrailingSlash = false
  if (pathname !== '/' && pathname.endsWith('/')) {
    newPathname = pathname.slice(0, -1)
    hasTrailingSlash = true
  }

  // If either SEO rule is violated, issue a permanent 301 redirect
  if (hasWww || hasTrailingSlash) {
    let finalProtocol = 'https'
    // Fallback to HTTP for local testing
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      finalProtocol = 'http'
    } else {
      finalProtocol = getRequestHeader(event, 'x-forwarded-proto') || 'https'
    }
    
    let redirectUrl = `${finalProtocol}://${newHost}${newPathname}`
    if (search) {
      redirectUrl += `?${search}`
    }
    
    return sendRedirect(event, redirectUrl, 301)
  }
})
