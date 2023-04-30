<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { ChatMessageOrig } from "@/api/native/chatbot"

@Component
export default class ArtworkCreate extends Vue {
    public loading = false

    public avatars = {
        bot: "assets/img/icon.svg",
        user: "assets/img/avatar.jpg",
    }

    public chating: ChatMessageOrig[] = []

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: ChatMessageOrig = {
        content: "",
        role: "user",
    }

    public formRules: FormRules<ChatMessageOrig> = {
        content: [{ required: true }],
        role: [{ required: true }],
    }

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        this.loading = true
        this.chating.push({ ...this.formModel })
        this.formModel.content = ""
        const res = await NaApi.chatbot.message(this.chating).finally(() => {
            this.loading = false
        })
        this.chating.push(res.Item)
    }

    // 清空聊天

    public chatClear() {
        this.chating = []
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                智能对话
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card hover-shadow header-bordered>
            <t-list>
                <template v-for="item, k of chating" :key="k">
                    <t-list-item :class="item.role">
                        <t-list-item-meta :image="item.role == 'user' ? avatars.user : avatars.bot"
                            :description="item.content" />
                    </t-list-item>
                </template>
                <t-list-item v-if="loading" class="assistant">
                    <t-list-item-meta :image="avatars.bot" description="正在生成 ..." />
                </t-list-item>
            </t-list>
            <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
                <t-textarea v-model="formModel.content" :autosize="{ minRows: 3, maxRows: 15 }" :maxlength="512" />
                <t-space>
                    <t-button theme="primary" type="submit" :loading="loading">
                        发送
                    </t-button>
                    <t-button theme="warning" @click="chatClear">
                        清除记录
                    </t-button>
                </t-space>
            </t-form>
        </t-card>
    </t-space>
</template>

<style lang="scss" scoped>
.image-output {
    width: 100%;
    max-width: 480px;
}
</style>
