const http = require('http');

async function testFullSave() {
  try {
    // 1. GET the slot (just like [id].vue does on load)
    const getRes = await fetch('http://localhost:3001/api/slots/cmeocg6bd0001u5do1jpoas43');
    const slotStr = await getRes.text();
    const data = JSON.parse(slotStr);
    
    // 2. Format payload exactly like `saveSlot` in `[id].vue`
    const payload = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      status: data.status,
      is_active: data.is_active,
      provider_id: data.provider_id,
      rtp: data.rtp,
      volatility: data.volatility,
      max_win: data.max_win,
      release_date: data.release_date,
      category_id: data.category_id,
      rating: data.rating,
      rating_count: data.rating_count,
      play_count: data.play_count,
      views_count: data.views_count,
      // relations
      selected_mechanics: data.slot_mechanics?.map(m => m.mechanic_id) || [],
      selected_bonuses: data.slot_bonuses?.map(b => b.bonus_id) || [],
      selected_themes: data.slotThemes?.map(t => t.theme_id) || [],
      localizations: data.localizations || {}
    };

    // Note: In [id].vue there is a long array `seoFields` that maps `payload[field] = data[field]`
    const seoFields = [
      'hero_keyword', 'hero_keyword_2', 'hero_keyword_3',
      'jsonld_enabled', 'jsonld_type', 'jsonld_game_genre',
      'jsonld_game_platform', 'jsonld_content_rating', 'jsonld_is_free',
      'jsonld_enable_product', 'jsonld_enable_review', 'jsonld_enable_faq',
      'jsonld_enable_howto', 'jsonld_enable_breadcrumb', 'jsonld_enable_video',
      'jsonld_review_author', 'jsonld_review_rating', 'jsonld_review_text',
      'jsonld_faq_json', 'jsonld_howto_json', 'jsonld_video_url',
      'jsonld_video_thumbnail', 'jsonld_video_duration', 'jsonld_video_description',
      'seo_title', 'seo_description', 'seo_keywords_primary',
      'seo_keywords_lsi', 'seo_keywords_geo', 'content_language',
      'geo_target_regions', 'search_intent', 'canonical_url',
      'og_title', 'og_description', 'og_image', 'og_type', 'og_url',
      'og_site_name', 'og_locale', 'og_locale_alternate', 'og_video',
      'og_video_type', 'og_video_width', 'og_video_height', 'og_image_width',
      'og_image_height', 'og_image_alt', 'twitter_card', 'twitter_site',
      'twitter_creator', 'twitter_title', 'twitter_description', 'twitter_image',
      'twitter_image_alt', 'twitter_player', 'twitter_player_width', 'twitter_player_height',
      'robots_index', 'robots_follow', 'robots_max_snippet', 'robots_max_image_preview',
      'robots_max_video_preview', 'robots_notranslate', 'robots_noimageindex',
      'robots_unavailable_after', 'hreflang_enabled', 'hreflang_x_default',
      'hreflang_config', 'hreflang_preset', 'author_meta', 'publisher_meta',
      'copyright_meta', 'last_reviewed_date', 'content_updated_at', 'preconnect_urls',
      'preload_image', 'dns_prefetch_urls', 'eeat_experience_date', 'eeat_experience_hours',
      'eeat_experience_sessions', 'eeat_experience_screenshots', 'eeat_author_name',
      'eeat_author_position', 'eeat_author_bio', 'eeat_author_avatar', 'eeat_author_social',
      'eeat_expertise_years', 'eeat_reviews_count', 'eeat_certifications', 'eeat_partnerships',
      'eeat_citations_count', 'eeat_awards', 'eeat_featured_in', 'eeat_data_sources',
      'eeat_fact_checked', 'eeat_fact_check_date', 'eeat_methodology', 'eeat_disclaimer',
      'eeat_license_info', 'content_published_date', 'content_major_update', 'content_minor_update',
      'content_reviewed_date', 'content_version', 'content_changelog', 'content_update_frequency',
      'content_next_review', 'content_freshness_score', 'social_share_count', 'social_facebook_shares'
    ];
    seoFields.forEach(f => payload[f] = data[f]);

    // Remove undefined
    for(let k in payload) if(payload[k] === undefined) delete payload[k];

    // 3. PUT it back
    const putRes = await fetch('http://localhost:3001/api/slots/cmeocg6bd0001u5do1jpoas43', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await putRes.text();
    console.log('Status:', putRes.status);
    console.log('Response:', result);
  } catch(e) {
    console.log(e);
  }
}
testFullSave();
