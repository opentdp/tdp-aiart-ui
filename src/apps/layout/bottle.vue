<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import Header from "./header_bottle.vue"
import Content from "./content.vue"
import Footer from "./footer.vue"
import Sidebar from "./sidebar.vue"

@Component({
    components: { Header, Content, Footer, Sidebar }
})
export default class LayoutBottle extends Vue {
}
</script>

<template>
    <t-layout>
        <t-layout>
            <t-header>
                <Header view="bottle" />
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
</style>
