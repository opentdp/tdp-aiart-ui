<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions } from "tdesign-vue-next"

import { NaApi } from "@/api"
import { ChatbotMessageOrig, ChatbotEngine } from "@/api/native/chatbot"

import Prompts from "./prompt.json"
import sessionStore from "@/store/session"

@Component
export default class ChatbotCreate extends Vue {
    public session = sessionStore()
    public ChatbotEngine = ChatbotEngine
    public Prompts = Prompts

    public loading = false

    public useStream = true
    public chatModel = "gpt-3.5-turbo"

    public chatRole = ""
    public chatRecord: ChatbotMessageOrig[] = []

    public botAvatar = "assets/image/avatar2.jpg"

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: ChatbotMessageOrig = {
        Role: "user",
        Content: "",
    }

    public formSubmit() {
        this.loading = true
        this.chatRecord.push({
            Role: this.formModel.Role,
            Content: this.formModel.Content
        })
        // 当前索引
        let idx = 0
        // 聊天记录
        const query = {
            Model: this.chatModel,
            Messages: this.chatRecord
        }
        // 流响应模式
        if (this.useStream) {
            const fn = (res: ChatbotMessageOrig) => {
                const r = this.chatRecord[idx]
                if (r.Content == "正在思考...") {
                    r.Content = res.Content
                } else {
                    r.Content += res.Content
                }
            }
            NaApi.chatbot.stream(query, fn)
                .catch(e => {
                    this.chatClear(idx)
                    console.log("err1", e)
                })
                .finally(() => {
                    this.loading = false
                })
        }
        // 一次性模式 
        else {
            NaApi.chatbot.create(query)
                .then(res => {
                    this.chatRecord[idx].Content = res.Message.Content
                })
                .catch(e => {
                    this.chatClear(idx)
                    console.log("err2", e)
                })
                .finally(() => {
                    this.loading = false
                })
        }
        // 延迟模拟数据
        idx = this.chatRecord.push({
            Role: "assistant",
            Content: "正在思考..."
        }) - 1
        // 清空输入
        this.formModel.Content = ""
    }

    // 设置角色

    public onRolechange() {
        this.formModel.Content = this.chatRole
    }

    // 清空聊天

    public chatClear(id = -1) {
        if (id >= 0) {
            this.chatRecord.splice(id, 1)
        } else {
            Object.assign(this, { chatRole: null, chatRecord: [] })
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
                    <t-list-item-meta :image="item.Role == 'user' ? session.Avatar : botAvatar">
                        <template #description>
                            <div v-markdown="item.Content" class="message" />
                        </template>
                    </t-list-item-meta>
                    <template #action>
                        <t-button shape="circle" variant="text" @click="chatClear(k)">
                            <t-icon name="rollback" />
                        </t-button>
                    </template>
                </t-list-item>
            </template>
        </t-list>

        <t-card hover-shadow header-bordered>
            <t-form ref="formRef" :data="formModel" label-width="80px" @submit="formSubmit">
                <t-form-item label="流式响应">
                    <t-radio-group v-model="useStream">
                        <t-radio :value="true" label="开启" />
                        <t-radio :value="false" label="关闭" />
                    </t-radio-group>
                </t-form-item>
                <t-form-item label="语言模型">
                    <t-select v-model="chatModel">
                        <t-option v-for="v, k in ChatbotEngine" :key="k" :value="v" :label="v" />
                    </t-select>
                </t-form-item>
                <t-form-item label="情景模式">
                    <t-select v-model="chatRole" @change="onRolechange">
                        <t-option v-for="v, k in Prompts.prompts" :key="k" :value="v.prompt" :label="v.title" />
                    </t-select>
                </t-form-item>
                <t-form-item label="输入内容">
                    <t-textarea v-model="formModel.Content" :autosize="{ minRows: 3, maxRows: 30 }" :maxlength="3072" />
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
.message {
    word-wrap: break-word;
}
</style>
