import { HttpClient } from "@/api/basic/http"

export class ChatbotModel extends HttpClient {
    public create(rq: ChatbotCreateParam): Promise<ChatbotCreateResult> {
        return this.post("/chatbot/create", rq)
    }

    public models(): Promise<ChatbotModel[]> {
        return this.post("/chatbot/models", {})
    }

    public stream(rq: ChatbotCreateParam, fn: (d: ChatbotMessageOrig) => void): Promise<unknown> {
        const callback = (s: string) => {
            const data = s.match(/^event:(\w+)\ndata:(.+)/)
            if (data && data[2]) {
                const json = JSON.parse(data[2])
                json && json.Message && fn(json.Message)
            }
        }
        return this.request({ method: "POST", url: "/chatbot/stream", query: rq }, callback)
    }
}

export interface ChatbotModel {
    Name: string
    CreatedAt: number
}

export interface ChatbotMessageOrig {
    Role: string
    Content: string
}

export interface ChatbotCreateParam {
    Model: string
    Messages: ChatbotMessageOrig[]
}

export interface ChatbotCreateResult {
    Message: ChatbotMessageOrig
}
