<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

import Header from "./header.vue"
import Content from "./content.vue"
import Footer from "./footer.vue"
import Sidebar from "./sidebar.vue"

@Component({
    components: { Header, Content, Footer, Sidebar }
})
export default class LayoutBottle extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    // 菜单列表

    public items: MenuItem[] = []

    // 初始化

    public created() {
        this.items = this.itemFilter(menuItems)
    }

    public itemFilter(items: MenuItem[]) {
        const level = this.session.Level
        return items.filter(item => {
            if (item.level && item.level < level) {
                return false //用户组权限不足
            }
            if (item.subs) {
                item.subs = this.itemFilter(item.subs)
            }
            return true
        })
    }

    // 切换主题模式

    public themeModeChange() {
        const mode = this.layout.ThemeMode == "dark" ? "light" : "dark"
        this.layout.setThemeMode(mode)
    }
}

interface MenuItem {
    icon: string
    index: string
    title: string
    level?: number
    subs?: MenuItem[]
}

const menuItems: MenuItem[] = [
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
</script>

<template>
    <t-layout>
        <t-layout>
            <t-header>
                <t-head-menu :value="$route.path">
                    <template #logo>
                        <a class="logo" href="/" :title="layout.SiteName">
                            <img :src="layout.Collapse ? layout.SiteIcon : layout.SiteLogo">
                        </a>
                    </template>
                    <template v-for="item in items" :key="item.index">
                        <t-menu-item :value="item.index" :to="{ path: item.index }">
                            {{ item.title }}
                        </t-menu-item>
                    </template>
                    <template #operations>
                        <t-button shape="circle" variant="text" @click="themeModeChange">
                            <img :src="'assets/image/' + (layout.ThemeMode == 'dark' ? 'sun' : 'moon') + '.svg'" width="20">
                        </t-button>
                        <t-button v-if="session.UserId" v-route="'/dashboard'" theme="default" variant="text">
                            控制台
                        </t-button>
                        <t-button v-else v-route="'/passport/login'" theme="default" variant="text">
                            登录
                        </t-button>
                    </template>
                </t-head-menu>
            </t-header>
            <t-layout class="main">
                <t-content>
                    <Content />
                </t-content>
                <t-footer class="footer">
                    <Footer />
                </t-footer>
            </t-layout>
        </t-layout>
    </t-layout>
</template>

<style lang="scss" scoped>
.main {
    padding: 16px 16px 0 16px;
    height: calc(100vh - 56px);
    overflow-y: auto;

    .footer {
        padding: 16px 0
    }
}

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
