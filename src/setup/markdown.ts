/**
 * Markdown Parser
 * https://github.com/miaolz123/vue-markdown
 */

import type { App, Plugin } from "vue"

import MarkdownIt from "markdown-it"
import MarkdownItAbbr from "markdown-it-abbr"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItDeflist from "markdown-it-deflist"
import MarkdownItEmoji from "markdown-it-emoji"
import MarkdownItFootnote from "markdown-it-footnote"
import MarkdownItIns from "markdown-it-ins"
import MarkdownItMark from "markdown-it-mark"
import MarkdownItHighlightjs from "markdown-it-highlightjs"
import MarkdownItSub from "markdown-it-sub"
import MarkdownItSup from "markdown-it-sup"
import MarkdownItTasklists from "markdown-it-task-lists"
import MarkdownItTOC from "markdown-it-toc-done-right"

const markdown = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
})
    .use(MarkdownItHighlightjs)
    .use(MarkdownItAbbr)
    .use(MarkdownItAnchor)
    .use(MarkdownItDeflist)
    .use(MarkdownItEmoji)
    .use(MarkdownItFootnote)
    .use(MarkdownItIns)
    .use(MarkdownItMark)
    .use(MarkdownItSub)
    .use(MarkdownItSup)
    .use(MarkdownItTasklists)
    .use(MarkdownItTOC)

const plugin: Plugin = {
    install: (app: App) => {
        app.directive('markdown', (el, binding) => {
            console.log(binding.value)
            el.innerHTML = markdown.render(binding.value)
        })
    },
}

// export default

export default (app: App) => {
    app.use(plugin)
}
