<template>
  <div class="relative z-10 flex flex-col min-h-screen pb-12 bg-[#050814]">
    <!-- Spectacular Article Hero Banner -->
    <header class="relative overflow-hidden min-h-[60vh] flex flex-col justify-end pb-16 border-b border-indigo-500/20 shadow-[0_10px_40px_rgba(79,70,229,0.15)] bg-[#050814]">
      <!-- Background Image -->
      <div v-if="post?.cover_image_url" class="absolute inset-0">
        <img :src="post.cover_image_url" :alt="postTitle" class="w-full h-full object-cover opacity-60" />
      </div>
      <!-- Fallback Background -->
      <div v-else class="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/50">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>
      </div>
      <!-- Gradual Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/80 to-transparent"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-white/50 mb-8 font-medium">
          <NuxtLink to="/" class="hover:text-white transition-colors drop-shadow-md">Home</NuxtLink>
          <span class="text-white/20">/</span>
          <NuxtLink to="/blogs" class="hover:text-white transition-colors drop-shadow-md">Blogs</NuxtLink>
          <span class="text-white/20">/</span>
          <span class="text-white/80 truncate max-w-xs drop-shadow-md">{{ postTitle }}</span>
        </nav>

        <div class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <span v-if="postData?.category" class="text-xs font-bold bg-indigo-600 border border-indigo-400 text-white px-4 py-1.5 rounded-sm shadow-[0_0_15px_rgba(99,102,241,0.5)] uppercase tracking-wider">
              {{ postData.category }}
            </span>
            <span class="text-sm font-medium text-white/60 drop-shadow-md">{{ formatDate(post?.published_at) }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
            <span v-if="post?.reading_time" class="text-sm font-bold text-indigo-300 drop-shadow-md">{{ post.reading_time }} min read</span>
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl mb-6">
            {{ postTitle }}
          </h1>

          <p v-if="postExcerpt" class="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl drop-shadow-xl border-l-4 border-indigo-500 pl-6 bg-gradient-to-r from-indigo-500/10 to-transparent py-2">
            {{ postExcerpt }}
          </p>
        </div>
      </div>
    </header>

    <!-- Error State -->
    <div v-if="error" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <Icon name="solar:close-circle-bold-duotone" class="text-6xl text-red-500" />
        </div>
        <h2 class="text-3xl font-black mb-4 text-white">Intel Not Found</h2>
        <p class="text-white/60 mb-8 text-lg">{{ error.message || 'The article you are looking for does not exist in our database.' }}</p>
        <NuxtLink to="/blogs" class="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] font-bold tracking-wide">
          ← Return to Blogs
        </NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-else-if="pending" class="container mx-auto px-4 py-16 animate-pulse max-w-4xl">
       <div class="space-y-6">
        <div class="h-6 bg-white/5 rounded w-1/4"></div>
        <div class="h-64 bg-white/5 rounded-3xl"></div>
        <div v-for="i in 10" :key="i" class="h-4 bg-white/5 rounded" :class="i % 3 === 0 ? 'w-5/6' : 'w-full'"></div>
      </div>
    </div>

    <!-- Article Content Layout -->
    <div v-else class="container mx-auto px-4 py-12">
      <!-- Main Content -->
      <article class="max-w-4xl mx-auto w-full">
        <!-- Author Info Block -->
        <div class="flex items-center gap-4 p-6 bg-[#0a0f24] rounded-2xl border border-white/5 shadow-xl mb-12 transform -translate-y-6 relative z-10">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(147,51,234,0.4)]">
            {{ (post?.author_name || 'SQ')[0] }}
          </div>
          <div>
            <p class="text-white font-bold text-lg mb-0.5">{{ post?.author_name || 'SlotQuest Editorial' }}</p>
            <p class="text-blue-400 text-sm font-medium">Head Editor</p>
          </div>
          <!-- Share buttons placeholder (could be real social buttons) -->
          <div class="ml-auto flex gap-2">
             <button class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
               <Icon name="solar:link-bold" class="text-lg" />
             </button>
             <button class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
               <Icon name="bi:twitter-x" class="text-sm" />
             </button>
          </div>
        </div>

        <div class="blog-rich-content max-w-none" v-html="renderedContent"></div>

        <!-- Tags -->
        <div v-if="postTags?.length" class="flex flex-wrap items-center gap-3 mt-16 pt-8 border-t border-white/10">
          <span class="text-white/40 text-sm font-bold uppercase tracking-widest mr-2 flex items-center gap-2"><Icon name="solar:tag-bold-duotone" class="text-lg" /> Tags:</span>
          <span
            v-for="tag in postTags"
            :key="tag"
            class="text-xs bg-[#0a0f24] text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)] font-bold uppercase tracking-wider"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Back Link -->
        <div class="mt-16 text-center">
          <NuxtLink to="/blogs" class="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl transition-all font-bold group border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span class="group-hover:-translate-x-1 transition-transform">←</span> Back to Intel Database
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const slug = route.params.slug
const { locale } = useI18n()
const { getBlogBySlug } = useBlogs()

const { data: blogResponse, pending, error } = await useAsyncData(
  `blog-${slug}`,
  () => getBlogBySlug(slug)
)

const post = computed(() => blogResponse.value?.data || null)

// Localization helpers
const localizedField = (field) => {
  const p = post.value
  if (!p) return ''
  if (p.localizations && p.localizations[locale.value] && p.localizations[locale.value][field]) {
    return p.localizations[locale.value][field]
  }
  return p[field] || ''
}

const postTitle = computed(() => localizedField('title') || postData.value?.seo_title)
const postExcerpt = computed(() => localizedField('excerpt') || postData.value?.seo_desc)
const postData = computed(() => {
  if (!post.value) return null
  if (post.value.localizations && post.value.localizations[locale.value]) {
    return { ...post.value, ...post.value.localizations[locale.value] }
  }
  return post.value
})

const postTags = computed(() => {
  if (!post.value?.tags) return []
  return post.value.tags.split(',').map(t => t.trim()).filter(Boolean)
})

// Advanced markdown -> HTML Parser
const renderedContent = computed(() => {
  // If the localized version has content_html (e.g. from our generation script), use it directly
  const html = localizedField('content_html')
  if (html) return html

  // Otherwise, use content_markdown and parse it
  let md = localizedField('content_markdown')
  if (!md) return '<p>No content available.</p>'
  
  // Clean multiple newlines while preserving structure
  md = md.replace(/\r\n/g, '\n')

  return md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    
    // Bold, Italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    
    // Unordered Lists
    .replace(/^- (.+)$/gm, '<li><span>$1</span></li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc pl-6 space-y-2 my-6">$&</ul>')
    
    // Ordered Lists (very basic)
    .replace(/^\d+\. (.+)$/gm, '<li><span>$1</span></li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match, p1, offset, string) => {
        // Only wrap if it's not already inside a ul
        if (string.substring(0, offset).indexOf('<ul') > -1 && string.substring(0, offset).lastIndexOf('</ul>') < string.substring(0, offset).lastIndexOf('<ul')) return match;
        if(match.includes('<ul')) return match; // Already handled Unordered
        return `<ol class="list-decimal pl-6 space-y-2 my-6">${match}</ol>`
    })

    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/(<blockquote>.*<\/blockquote>\n?)+/g, '<blockquote>$&</blockquote>') // Group quotes (basic)

    // Paragraphs (Wrap text that is not inside an HTML tag and has empty lines around it)
    .replace(/^(?!<(h[1-6]|ul|ol|li|blockquote|div|table|tr|th|td|p))(.+)$/gm, '<p>$2</p>')
    .replace(/<\/p>\n<p>/g, '</p><p>')
    .replace(/<br\s*[\/]?>/gi, '\n')
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

// JSON-LD Article Schema
if (post.value) {
  useSchemaOrg([
    defineArticle({
      '@type': 'Article',
      headline: postTitle.value,
      description: postExcerpt.value || postData.value?.seo_desc || '',
      articleBody: renderedContent.value.replace(/<[^>]*>?/gm, ''),
      image: post.value.cover_image_url ? [post.value.cover_image_url] : [],
      author: {
        name: post.value.author_name || 'SlotQuest Editorial'
      },
      datePublished: post.value.published_at,
      dateModified: post.value.updated_at || post.value.published_at
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: 'Home', item: '/' },
        { name: 'Blogs', item: '/blogs' },
        { name: postTitle.value }
      ]
    })
  ])
}

// SEO & I18n Meta
const i18nHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: 'id', addSeoAttributes: true })
useHead({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang, dir: i18nHead.value.htmlAttrs.dir },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta
})

watchEffect(() => {
  if (post.value) {
    const finalTitle = postData.value?.seo_title || `${postTitle.value} | SlotQuest Journal`
    const finalDesc = postData.value?.seo_desc || postExcerpt.value || `Read ${postTitle.value} on SlotQuest Journal`
    
    useSeoMeta({
      title: finalTitle,
      description: finalDesc,
      ogTitle: postTitle.value,
      ogDescription: finalDesc,
      ogImage: post.value.cover_image_url || '/img/default-blog.webp',
      ogType: 'article',
      articlePublishedTime: post.value.published_at,
      articleModifiedTime: post.value.updated_at || post.value.published_at,
      articleAuthor: post.value.author_name || 'SlotQuest Editorial',
      twitterCard: 'summary_large_image',
    })
  }
})
</script>

<style>
/* Custom wazy underline for links just for premium feel */
.wavy-underline {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: rgba(59, 130, 246, 0.5);
    text-underline-offset: 4px;
}

/* Fallback for missing Typography plugin */
.blog-rich-content {
  color: #e2e8f0; /* slate-200 */
  font-size: 1.125rem;
  line-height: 2;
}

.blog-rich-content h2 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-weight: 900;
  letter-spacing: -0.025em;
}

@media (min-width: 1024px) {
  .blog-rich-content h2 {
    font-size: 2.5rem;
  }
  .blog-rich-content {
    font-size: 1.25rem;
  }
}

.blog-rich-content h3 {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #dbeafe; /* blue-100 */
  font-weight: 700;
}

.blog-rich-content p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.blog-rich-content a {
  color: #60a5fa; /* blue-400 */
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.blog-rich-content a:hover {
  color: #93c5fd; /* blue-300 */
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: rgba(59, 130, 246, 0.5);
  text-underline-offset: 4px;
}

.blog-rich-content strong {
  color: #ffffff;
  font-weight: 900;
}

.blog-rich-content blockquote {
  background-color: rgba(30, 27, 75, 0.2); /* indigo-950/20 */
  border-left: 4px solid #6366f1; /* indigo-500 */
  padding: 1rem 1.5rem;
  color: #c7d2fe; /* indigo-200 */
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin: 2rem 0;
}

.blog-rich-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.blog-rich-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.blog-rich-content li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.blog-rich-content li::marker {
  color: #3b82f6; /* blue-500 */
}

.blog-rich-content img {
  border-radius: 1.5rem; /* 3xl */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin-top: 2rem;
  margin-bottom: 2rem;
  max-width: 100%;
  height: auto;
}
</style>
