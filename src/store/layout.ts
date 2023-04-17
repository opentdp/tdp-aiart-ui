import { defineStore } from "pinia"

import { NaApi } from "@/api"
import * as vars from "@/helper/const"

export default defineStore("layout", {
    state: () => ({
        // 侧栏折叠
        Collapse: false,
        // 主题模式
        ThemeMode: "",
        // 后端本号
        Version: "",
        // 功能开关
        Registrable: false,
        // 前端配置
        SiteName: vars.SiteName,
        SiteLogo: "/assets/img/logo.svg",
        SiteIcon: "/assets/img/icon.svg",
        Analytics: vars.Analytics,
        Copylink: "https://www.opentdp.org",
        Copytext: "Powered by Open TDP",
        IcpCode: "",
    }),
    actions: {
        // 侧边栏折叠
        setCollapse(data: boolean) {
            this.Collapse = data
        },
        // 设置主题模式
        setThemeMode(mode: "dark" | "light" | "classic") {
            this.ThemeMode = mode
            this.applyConfig()
        },
        // 获取前端配置
        async fetchConfig() {
            const res = await NaApi.config.ui()
            Object.keys(res).forEach(k => {
                const v = res[k].trim()
                v && Object.assign(this, { [k]: v })
            })
            this.Registrable = res.Registrable == "true"
            this.applyConfig()
        },
        // 执行行内脚本
        runScript(code: string) {
            const script = document.createElement('script')
            script.innerHTML = code // 行内脚本
            document.body.appendChild(script)
            document.body.removeChild(script)
        },
        // 应用布局设置
        applyConfig() {
            if (this.Analytics) {
                this.runScript(this.Analytics)
            }
            if (document.body.clientWidth < 1000) {
                this.setCollapse(true)
            }
            document.documentElement.setAttribute('theme-mode', this.ThemeMode)
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "tdp/layout",
                storage: sessionStorage,
            },
        ],
    },
})
