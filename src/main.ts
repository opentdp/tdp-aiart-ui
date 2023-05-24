import "@/helper/globals"
import "@/theme/main.scss"

import { createApp } from "vue"

import App from "@/app.vue"

import setupPinia from "@/setup/pinia"

import setupRoute from "@/setup/route"
import setupRouter from "@/setup/router"

import setupTDesign from "@/setup/tdesign"

import setupCropper from "@/setup/cropper"
import setupHighlight from "@/setup/highlight"
import setupMarkdown from "@/setup/markdown"

const app = createApp(App)

setupPinia(app)

setupRoute(app)
setupRouter(app)

setupTDesign(app)

setupCropper(app)
setupHighlight(app)
setupMarkdown(app)

app.mount("#app")
