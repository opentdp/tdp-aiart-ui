/// <reference types="vite/client" />

// Vue Component

declare module "*.vue" {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<object, object, unknown>
    export default component
}

// Import Meta

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
    readonly VITE_API_BASE: string

    readonly VITE_USERNAME: string
    readonly VITE_PASSWORD: string

    readonly VITE_SECRET_ID: string
    readonly VITE_SECRET_KEY: string
}

// Declare for "markdown-it"

declare module "markdown-it-abbr" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-deflist" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-emoji" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-footnote" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-ins" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-mark" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-sub" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-sup" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}

declare module "markdown-it-task-lists" {
    import MarkdownIt from "markdown-it"
    const obj: MarkdownIt.PluginSimple
    export default obj
}
