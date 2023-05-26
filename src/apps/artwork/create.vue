<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import * as IArtwork from "@/api/native/typings/artwork"

import * as Tencent from "./provider/tencent"

@Component
export default class ArtworkCreate extends Vue {
    public meta = Tencent

    public loading = false

    public output: string[] = []

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: IArtwork.CreateImageRequest = {
        Action: "TextToImage",
        Subject: "",
        Prompt: "",
        NegativePrompt: "",
        Styles: ["000"],
        ResultConfig: {
            Resolution: "1024:768",
        },
        LogoAdd: 0,
        Status: "public",
    }

    public formRules: FormRules<IArtwork.CreateImageRequest> = {
        Subject: [{ required: true }],
        Prompt: [{ required: true }],
        Styles: [{ required: true }],
    }

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        this.loading = true
        const res = await NaApi.artwork.create(this.formModel).finally(() => {
            this.loading = false
        })
        this.output.unshift(res.OutputFile)
    }

    // 清空图片

    public imageClear() {
        this.output = []
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
                文生图
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="绘图参数" hover-shadow header-bordered>
            <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
                <t-form-item name="Subject" label="作品标题">
                    <t-input v-model="formModel.Subject" placeholder="请输入标题或备注" />
                </t-form-item>
                <t-form-item name="Status" label="作品状态">
                    <t-radio-group v-model="formModel.Status">
                        <t-radio value="public" label="全站用户可见" />
                        <t-radio value="private" label="仅自己可见" />
                    </t-radio-group>
                </t-form-item>
                <t-form-item name="Styles" label="绘画风格">
                    <t-select v-model="formModel.Styles" :placeholder="meta.styleDesc" :max="3" multiple>
                        <t-option v-for="item in meta.textStyles" :key="item.value" :value="item.value"
                            :label="item.label" />
                    </t-select>
                </t-form-item>
                <t-form-item name="Resolution" label="输出尺寸">
                    <t-select v-model="formModel.ResultConfig!.Resolution">
                        <t-option value="768:768" label="768x768" />
                        <t-option value="768:1024" label="768x1024" />
                        <t-option value="1024:768" label="1024x768" />
                    </t-select>
                </t-form-item>
                <t-form-item name="Prompt" label="文本描述">
                    <t-textarea v-model="formModel.Prompt" :autosize="{ minRows: 3, maxRows: 15 }" :maxlength="512"
                        :placeholder="meta.promptDesc" />
                </t-form-item>
                <t-form-item name="NegativePrompt" label="反向描述">
                    <t-textarea v-model="formModel.NegativePrompt" :autosize="{ minRows: 3, maxRows: 15 }" :maxlength="512"
                        :placeholder="meta.negativePromptDesc" />
                </t-form-item>
                <t-form-item v-if="output.length > 0" name="NegativePrompt" label="生成结果">
                    <t-image-viewer :images="output">
                        <template #trigger="{ open }">
                            <t-image :src="output[0]" :gallery="true" class="image-output" @click="open" />
                        </template>
                    </t-image-viewer>
                </t-form-item>
                <t-form-item>
                    <t-space>
                        <t-button theme="primary" type="submit" :loading="loading">
                            <template #icon>
                                <t-icon name="relativity" />
                            </template>
                            {{ output.length > 1 ? "重新生成" : "生成" }}
                        </t-button>
                        <t-button theme="danger" @click="imageClear">
                            <template #icon>
                                <t-icon name="clear" />
                            </template>
                            清除图片
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
