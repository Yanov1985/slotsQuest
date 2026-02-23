export const formatArticleDate = (dateString) => {
    if (!dateString) return ''

    try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return dateString

        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ]

        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        return `${day} ${month} ${year}`
    } catch (e) {
        console.error('Ошибка форматирования даты:', e)
        return dateString
    }
}

export const getEffectColorsFor = (theme) => {
    const t = (theme || '').toLowerCase()
    if (t.includes('amber') || t.includes('yellow')) return [[245, 158, 11], [217, 119, 6], [146, 64, 14]]
    if (t.includes('orange')) return [[249, 115, 22], [234, 88, 12], [194, 65, 12]]
    if (t.includes('red')) return [[239, 68, 68], [220, 38, 38], [185, 28, 28]]
    if (t.includes('rose')) return [[244, 63, 94], [225, 29, 72], [190, 18, 60]]
    if (t.includes('pink')) return [[236, 72, 153], [219, 39, 119], [190, 24, 93]]
    if (t.includes('purple') || t.includes('violet')) return [[168, 85, 247], [126, 34, 206], [109, 40, 217]]
    if (t.includes('indigo')) return [[99, 102, 241], [79, 70, 229], [67, 56, 202]]
    if (t.includes('blue')) return [[59, 130, 246], [37, 99, 235], [29, 78, 216]]
    if (t.includes('cyan')) return [[34, 211, 238], [6, 182, 212], [8, 145, 178]]
    if (t.includes('teal')) return [[20, 184, 166], [13, 148, 136], [15, 118, 110]]
    if (t.includes('emerald') || t.includes('green')) return [[16, 185, 129], [5, 150, 105], [6, 95, 70]]
    return [[71, 85, 105], [51, 65, 85], [30, 41, 59]]
}

export const getAwardEffectColors = (gradient) => {
    const g = gradient || ''
    if (g.includes('yellow') || g.includes('amber')) return [[245, 158, 11], [217, 119, 6], [146, 64, 14]]
    if (g.includes('purple') || g.includes('pink')) return [[168, 85, 247], [236, 72, 153], [126, 34, 206]]
    if (g.includes('green') || g.includes('emerald')) return [[16, 185, 129], [5, 150, 105], [6, 95, 70]]
    if (g.includes('blue') || g.includes('indigo')) return [[59, 130, 246], [79, 70, 229], [29, 78, 216]]
    return [[71, 85, 105], [51, 65, 85], [30, 41, 59]]
}

export const getAwardPublicClasses = (colorScheme) => {
    const colorMap = {
        amber: 'border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:border-amber-400/60',
        fuchsia: 'border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 hover:border-fuchsia-400/60',
        emerald: 'border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20 hover:border-emerald-400/60',
        blue: 'border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:border-blue-400/60',
    }
    return colorMap[colorScheme] || colorMap.amber
}

export const getAwardBgClasses = (colorScheme) => {
    const colorMap = {
        amber: 'bg-amber-400/20 group-hover:bg-amber-400/30',
        fuchsia: 'bg-fuchsia-400/20 group-hover:bg-fuchsia-400/30',
        emerald: 'bg-emerald-400/20 group-hover:bg-emerald-400/30',
        blue: 'bg-blue-400/20 group-hover:bg-blue-400/30',
    }
    return colorMap[colorScheme] || colorMap.amber
}

export const getAwardIconClasses = (colorScheme) => {
    const colorMap = {
        amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
        fuchsia: 'bg-gradient-to-r from-fuchsia-400 to-purple-500',
        emerald: 'bg-gradient-to-r from-emerald-400 to-green-500',
        blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    }
    return colorMap[colorScheme] || colorMap.amber
}

export const getAwardTextClasses = (colorScheme) => {
    const colorMap = {
        amber: 'text-amber-200/90',
        fuchsia: 'text-fuchsia-200/90',
        emerald: 'text-emerald-200/90',
        blue: 'text-blue-200/90',
    }
    return colorMap[colorScheme] || colorMap.amber
}

export const getSlotIcon = (name) => {
    if (!name) return '🎰'
    if (name.toLowerCase().includes('gates of olympus') || name.toLowerCase().includes('олимп')) return '⚡'
    return '🎰'
}

export const getImageFormat = (url) => {
    if (!url) return 'image/jpeg'
    const lower = url.toLowerCase()
    if (lower.includes('.webp')) return 'image/webp'
    if (lower.includes('.png')) return 'image/png'
    if (lower.includes('.gif')) return 'image/gif'
    if (lower.includes('.svg')) return 'image/svg+xml'
    if (lower.includes('.avif')) return 'image/avif'
    return 'image/jpeg'
}

export const getVolatilityText = (volatility) => {
    if (!volatility) return 'High'
    const vol = volatility.toLowerCase()
    if (vol.includes('high') || vol === 'высокая') return 'High'
    if (vol.includes('medium') || vol === 'средняя') return 'Medium'
    if (vol.includes('low') || vol === 'низкая') return 'Low'
    return volatility
}

export const getMaxWin = (slot) => {
    if (!slot || !slot.name) return 'x1,000'
    if ((slot.name || '').toLowerCase().includes('gates of olympus')) return 'x5,000'
    return slot.max_win || 'x1,000'
}

export const formatReleaseDate = (dateString) => {
    if (!dateString) return null
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch (error) {
        return null
    }
}

export const getSlotDescription = (slot) => {
    if (!slot || !slot.name) return 'Exciting video slot with excellent winning opportunities.'
    if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
        return `${slot.name || 'Slot'} - a revolutionary slot from Pragmatic Play that changed the perception of video slots. The game with a 6x5 field and Scatter Pays system offers unique gameplay where wins are awarded for 8+ identical symbols anywhere on the screen.`
    }
    return `${slot.name || 'Slot'} - exciting video slot from ${slot.providers?.name || 'renowned provider'} offering thrilling gameplay and excellent winning opportunities.`
}

export const replaceKeywordsInText = (text, slot, wrapInStrong = true) => {
    if (!text || !slot) return text
    let result = text
    if (slot.hero_keyword) {
        const replacement = wrapInStrong ? `<strong>${slot.hero_keyword}</strong>` : slot.hero_keyword
        result = result.replace(/\[keyword_1\]/g, replacement)
    }
    if (slot.hero_keyword_2) {
        const replacement = wrapInStrong ? `<strong>${slot.hero_keyword_2}</strong>` : slot.hero_keyword_2
        result = result.replace(/\[keyword_2\]/g, replacement)
    }
    if (slot.hero_keyword_3) {
        const replacement = wrapInStrong ? `<strong>${slot.hero_keyword_3}</strong>` : slot.hero_keyword_3
        result = result.replace(/\[keyword_3\]/g, replacement)
    }
    return result
}

export const getShortDescription = (slot, wrapInStrong = true) => {
    if (!slot) return 'Thrilling video slot with excellent winning opportunities and exciting gameplay.'
    if (slot.description && slot.description.trim()) {
        return replaceKeywordsInText(slot.description.trim(), slot, wrapInStrong)
    }
    if (!slot.name) return 'Thrilling video slot with excellent winning opportunities and exciting gameplay.'

    const lowerName = (slot.name || '').toLowerCase()
    if (lowerName.includes('gates of olympus')) return 'Legendary slot from Pragmatic Play with unique Scatter Pays mechanics and multipliers up to x500. Dive into the world of ancient Greek gods and fight for jackpot up to x5,000 bet multiplier!'
    if (lowerName.includes('book of dead')) return "Cult slot from Play'n GO about archaeologist Rich Wilde's adventures in Ancient Egypt. Bonus game with expanding symbols can bring wins up to x5,000!"
    if (lowerName.includes('sweet bonanza')) return 'Bright and sweet slot from Pragmatic Play with cascade wins and bonus multipliers. Collect 4+ lollipops to activate free spins!'

    return `Thrilling video slot from ${slot.providers?.name || 'leading provider'} with excellent winning opportunities and exciting gameplay.`
}

export const getDetailedDescription = (slot) => {
    if (!slot) return 'This exciting video slot offers players thrilling gameplay with plenty of opportunities for big wins. Modern graphics and sound effects create a unique atmosphere of excitement.'
    if (slot.description && slot.description.trim()) return slot.description.trim()
    if (!slot.name) return 'This exciting video slot offers players thrilling gameplay with plenty of opportunities for big wins. Modern graphics and sound effects create a unique atmosphere of excitement.'

    if ((slot.name || '').toLowerCase().includes('gates of olympus')) return 'The main feature of the slot is multipliers from x2 to x500 that appear randomly and can significantly increase your winnings. In the bonus game, the Total Multiplier system works where all multipliers are summed and not reset between spins, which can lead to phenomenal payouts.'
    return `This slot features high-quality graphics, well-thought-out mechanics, and an excellent balance between win frequency and payout size. The RTP is ${slot.rtp || '96'}%, making the game attractive to most players.`
}

export const getCleanSlotName = (slot) => {
    if (!slot || !slot.name) return 'Slot'
    let cleanName = slot.name
    const keywordsToRemove = ['Slot Review', 'Game Review', 'Casino Game', 'Slot Game', 'Online Slot', 'Slot Machine', 'Review']
    keywordsToRemove.forEach((keyword) => {
        const regex = new RegExp(`\\s*${keyword}\\s*$`, 'i')
        cleanName = cleanName.replace(regex, '')
    })
    return cleanName.trim()
}

export const getSlotNameWithKeyword = (slot) => {
    if (!slot) return 'Slot Review'
    return slot.hero_keyword || 'Slot Review'
}

export const processCtaSubtitle = (subtitle, keyword, slotName) => {
    if (!subtitle) return `Окунитесь в легендарный мир ${keyword || slotName || 'этого слота'}`
    if (subtitle.includes('[cta_keyword]')) {
        return subtitle.replace(/\[cta_keyword\]/g, keyword || slotName || 'этого слота')
    }
    return subtitle
}

export const processConclusionRatingTitle = (title, keyword, slotName) => {
    if (!title) return `Итоговая оценка ${keyword || slotName || 'slotа'}`
    if (title.includes('[conclusion_keyword]')) {
        return title.replace(/\[conclusion_keyword\]/g, keyword || slotName || 'slotа')
    }
    return title
}

export const processPopularityTitle = (title, keyword, slotName) => {
    if (!title) return `Насколько популярен ${keyword || slotName || 'этот slot'}?`
    if (title.includes('[popularity_keyword]')) {
        return title.replace(/\[popularity_keyword\]/g, keyword || slotName || 'этот slot')
    }
    return title
}

export const processProfExpertQuote = (quote, keyword, slotName) => {
    if (!quote) {
        const name = keyword || slotName || 'Этот слот'
        return `"${name} представляет собой революционный подход к созданию видеослотов. Механика Scatter Pays полностью меняет привычные правила игры, создавая уникальный опыт для каждого спина. Высокий потенциал выигрыша x5,000 в сочетании с каскадными символами делают каждый раунд непредсказуемым и захватывающим. 🎯"`
    }
    if (quote.includes('[prof_expert_keyword]')) {
        return quote.replace(/\[prof_expert_keyword\]/g, keyword || slotName || 'Этот слот')
    }
    return quote
}

export const processProfRecommendation = (text, keyword, slotName) => {
    if (!text) {
        const name = keyword || slotName || 'Этот slot'
        return `<span class="font-bold text-indigo-100">${name}</span> - это выдающийся slot для опытных игроков, которые ценят инновационную механику и готовы к высокой волатильности ради потенциала больших выигрышей. <span class="font-bold text-white">Новичкам рекомендуем начать с менее волатильных slotов.</span> Этот slot станет идеальным выбором для тех, кто ищет адреналин и готов к серьёзной игре! 🚀`
    }
    if (text.includes('[prof_recommendation_keyword]')) {
        const replacement = `<span class="font-bold text-indigo-100">${keyword || slotName || 'Этот slot'}</span>`
        return text.replace(/\[prof_recommendation_keyword\]/g, replacement)
    }
    return text
}

export const processConclusionText1 = (text, keyword, slotName) => {
    if (!text) {
        const name = keyword || slotName || 'Этот слот'
        return `${name} заслуженно считается одним из лучших слотов от Pragmatic Play. Сочетание инновационной механики Scatter Pays, высокого потенциала выигрыша до x5,000 и превосходной графики делают его обязательным для всех любителей азартных игр.`
    }
    if (text.includes('[conclusion_text_keyword]')) {
        return text.replace(/\[conclusion_text_keyword\]/g, keyword || slotName || 'Этот слот')
    }
    return text
}

export const processConclusionVerdict = (text, keyword, slotName) => {
    if (!text) {
        const name = keyword || slotName || 'Этот слот'
        return `<span class="font-bold text-indigo-100">${name}</span> - это не просто slot, это новая эра в мире азартных игр. Если вы готовы к вызову и хотите испытать настоящий адреналин от игры, этот slot создан именно для вас. Помните: играйте ответственно и наслаждайтесь процессом! 🎰`
    }
    if (text.includes('[conclusion_verdict_keyword]')) {
        const styledReplacement = `<span class="font-bold text-indigo-100">${keyword || slotName || 'Этот слот'}</span>`
        return text.replace(/\[conclusion_verdict_keyword\]/g, styledReplacement)
    }
    return text
}

export const getSlotThemes = (slot) => {
    return []
}

export const getSlotBonuses = (slot) => {
    if (!slot || !slot.slot_bonuses) return []
    return slot.slot_bonuses.map((sb) => sb.bonuses).filter(Boolean)
}

export const getSlotThemesFromDB = (slot) => {
    if (!slot || !slot.slotThemes) return []
    return slot.slotThemes.map((st) => st.themes).filter(Boolean)
}

export const formatMaxWin = (maxWin) => {
    if (!maxWin) return '0'
    const num = Number(maxWin)
    if (num >= 1000) return num.toLocaleString('en-US')
    return String(num)
}

export const formatPaylines = (paylines) => {
    if (!paylines) return '0'
    const num = Number(paylines)
    if (num >= 100000) return 'Megaways'
    if (num >= 1000) return num.toLocaleString('en-US')
    return String(num)
}

export const formatNumber = (num) => {
    if (!num) return '0'
    const n = Number(num)
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return n.toLocaleString('en-US')
}
