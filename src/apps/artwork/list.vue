<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"
import { VueFlexWaterfall } from "vue-flex-waterfall"

import { NaApi } from "@/api"
import { ArtworkItem } from "@/api/native/artwork"

import sessionStore from "@/store/session"

import ArtworkUpdate from "./update.vue"

@Component({
    components: {
        ArtworkUpdate, VueFlexWaterfall,
    },
})
export default class ArtworkList extends Vue {
    public session = sessionStore()

    @Ref
    public updateModal!: ArtworkUpdate

    public created() {
        this.getArtworkList()
    }

    // 获取图片列表

    public images: ArtworkItem[] = []

    async getArtworkList() {
        const res = await NaApi.artwork.list({
            UserId: this.session.Level > 1 ? this.session.UserId : 0
        })
        this.images = res.Items
    }

    // 编辑图片信息

    async updateArtwork(event: MouseEvent, item: ArtworkItem) {
        this.updateModal.open(item)
        event.stopPropagation()
    }

}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                图库
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space fixed direction="vertical">
            <VueFlexWaterfall align-content="start" col="4" col-spacing="10" :break-by-container="true" :break-at="{ 2330: 8, 2070: 7, 1810: 6, 1550: 5, 1290: 4, 1030: 3, 770: 2, 510: 1 }">
                <t-card v-for="item in images" :key="item.Id" theme="poster2" class="item">
                    <template #default>
                        <t-image-viewer :images="[item.OutputFile]">
                            <template #trigger="{ open }">
                                <t-image :src="item.OutputFile" @click="open">
                                    <template #overlayContent>
                                        <t-tag class="image-tag" theme="warning" variant="light" @click="updateArtwork($event.e, item)">
                                            <t-icon :name="item.Status == 'private' ? 'browse-off' : 'browse'" /> 编辑
                                        </t-tag>
                                    </template>
                                </t-image>
                            </template>
                        </t-image-viewer>
                    </template>
                    <template #footer>
                        <t-popup destroy-on-close hide-empty-popup>
                            <a href="javascript:;">{{ item.Subject }}</a>
                            <template #content>
                                <div class="popup">
                                    <div v-if="item.Prompt">
                                        <b>描述：</b>{{ item.Prompt }}
                                    </div>
                                    <div v-if="item.NegativePrompt">
                                        <b>反向描述：</b>{{ item.NegativePrompt }}
                                    </div>
                                </div>
                            </template>
                        </t-popup>
                    </template>
                </t-card>
            </VueFlexWaterfall>

            <ArtworkUpdate ref="updateModal" @submit="getArtworkList" />
        </t-space>
    </t-space>
</template>

<style lang="scss" scoped>
.item {
    width: 250px;
    margin-bottom: 10px;

    :deep(.t-card__body) {
        line-height: 0;
        padding: 0;
    }

    :deep(.t-image__wrapper) {
        min-height: 100px;
        cursor: pointer;
    }

    .image-tag {
        position: absolute;
        right: 8px;
        bottom: 8px;
    }
}

.popup{
    max-width: 50vw;
    padding: 10px;
}
</style>