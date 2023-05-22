<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { ChatbotMessageOrig, ChatbotEngine } from "@/api/native/chatbot"

@Component
export default class ArtworkCreate extends Vue {
    public ChatbotEngine = ChatbotEngine
    public loading = false

    public avatars = {
        bot: "assets/img/icon.svg",
        user: "assets/img/avatar.jpg",
    }

    public chatModel = "gpt-3.5-turbo"
    public chatRecord: ChatbotMessageOrig[] = []

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: ChatbotMessageOrig = {
        Role: "user",
        Content: "",
    }

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        this.loading = true
        this.chatRecord.push({
            Role: this.formModel.Role,
            Content: this.formModel.Content
        })
        const query = {
            Model: this.chatModel,
            Messages: this.chatRecord
        }
        this.formModel.Content = "" // 清空输入框
        const res = await NaApi.chatbot.create(query).finally(() => {
            this.loading = false
        })
        // 更新聊天记录
        this.chatRecord.push(...res.Messages)
    }

    // 清空聊天

    public chatClear(id = -1) {
        if (id >= 0) {
            this.chatRecord.splice(id, 1)
        } else {
            this.chatRecord = []
            this.formRef.reset()
        }
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

        <t-list v-if="chatRecord.length > 0" stripe>
            <template v-for="item, k of chatRecord" :key="k">
                <t-list-item :class="item.Role">
                    <t-list-item-meta :image="item.Role == 'user' ? avatars.user : avatars.bot"
                        :description="item.Content" />
                    <template #action>
                        <t-button shape="circle" variant="text" @click="chatClear(k)">
                            <t-icon name="rollback" />
                        </t-button>
                    </template>
                </t-list-item>
            </template>
            <t-list-item v-if="loading" class="assistant">
                <t-list-item-meta :image="avatars.bot" description="正在生成 ..." />
            </t-list-item>
        </t-list>

        <t-card hover-shadow header-bordered>
            <t-form ref="formRef" :data="formModel" label-width="80px" @submit="formSubmit">
                <t-form-item label="语言模型">
                    <t-select v-model="chatModel">
                        <t-option v-for="v, k in ChatbotEngine" :key="k" :value="v" :label="v" />
                    </t-select>
                </t-form-item>
                <t-form-item label="输入内容">
                    <t-textarea v-model="formModel.Content" :autosize="{ minRows: 3, maxRows: 15 }" :maxlength="512" />
                </t-form-item>
                <t-form-item>
                    <t-space>
                        <t-button theme="primary" type="submit" :disabled="formModel.Content == ''" :loading="loading">
                            发送
                        </t-button>
                        <t-button theme="warning" :disabled="chatRecord.length == 0" @click="chatClear(-1)">
                            重新开始
                        </t-button>
                    </t-space>
                </t-form-item>
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
