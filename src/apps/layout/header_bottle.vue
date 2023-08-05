<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import cacheStore from "@/store/cache"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class LayoutHeader extends Vue {
    public cache = cacheStore()
    public layout = layoutStore()
    public session = sessionStore()

    // 切换主题模式
    public themeModeChange() {
        const mode = this.layout.ThemeMode == "dark" ? "light" : "dark"
        this.layout.setThemeMode(mode)
    }

    // 导航菜单列表
    public navItems = [
        {
            icon: "home",
            index: "/",
            title: "图库",
        },
        {
            icon: "server",
            index: "/artwork/create",
            title: "文生图",
        },
        {
            icon: "image",
            index: "/artwork/create2",
            title: "图生图",
        },
        {
            icon: "precise-monitor",
            index: "/chatbot/create",
            title: "智能对话",
        },
    ]

    // 用户名下拉菜单
    public get userDropdown() {
        return [
            {
                content: '控制面板',
                value: "dashboard",
                onClick: () => {
                    this.$router.push({ name: "dashboard" })
                }
            },
            {
                content: '清理缓存',
                value: "delcache",
                onClick: () => {
                    this.cache.$reset()
                    this.layout.$reset()
                    NaApi.cache.clear()
                    location.reload()
                }
            },
            {
                content: '退出登录',
                value: "loginout",
                onClick: () => {
                    this.session.$reset()
                    this.$router.push({ name: "home-index" })
                }
            },
        ]
    }
}
</script>

<template>
    <t-head-menu>
        <template #logo>
            <a class="logo" href="/" :title="layout.SiteName">
                <img :src="layout.Collapse ? layout.SiteIcon : layout.SiteLogo">
            </a>
        </template>
        <template v-for="item in navItems" :key="item.index">
            <t-menu-item :value="item.index" :to="{ path: item.index }">
                {{ item.title }}
            </t-menu-item>
        </template>
        <template #operations>
            <t-button shape="circle" variant="text" @click="themeModeChange">
                <img :src="'assets/image/' + (layout.ThemeMode == 'dark' ? 'sun' : 'moon') + '.svg'" width="20">
            </t-button>
            <t-button shape="circle" variant="text" href="https://github.com/opentdp/tdp-aiart" target="_blank">
                <t-icon name="logo-github" size="20" />
            </t-button>
            <t-dropdown :options="userDropdown">
                <t-button theme="default" variant="text">
                    <t-avatar size="20px" :image="session.Avatar" />
                    &nbsp; {{ session.Username }}
                    <template #suffix>
                        <t-icon name="chevron-down" size="16" />
                    </template>
                </t-button>
            </t-dropdown>
        </template>
    </t-head-menu>
</template>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: end;
    justify-content: center;
    padding-left: 16px;
    width: 100%;

    img {
        height: 40px;
    }
}
</style>
