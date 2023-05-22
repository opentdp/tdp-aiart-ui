import { HttpClient } from "@/api/basic/http"

export class ChatbotModel extends HttpClient {
    public create(rq: ChatbotCreateParam): Promise<ChatbotCreateResult> {
        return this.post("/chatbot/create", rq)
    }
    public stream(rq: ChatbotCreateParam, fn: (d: ChatbotMessageOrig) => void): Promise<unknown> {
        const callback = (s: string) => {
            const data = s.match(/^event:(\w+)\ndata:(.+)/)
            if (data) {
                const json = JSON.parse(data[2])
                fn(json && json.Message)
            }
        }
        return this.request({ method: "POST", url: "/chatbot/stream", query: rq }, callback)
    }
}

export const ChatbotEngine = [
    "gpt-3.5-turbo",
    "gpt-4-32k",
    "gpt-4",
]

export interface ChatbotMessageOrig {
    Role: string
    Content: string
}

export interface ChatbotCreateParam {
    Model: string
    Messages: ChatbotMessageOrig[]
}

export interface ChatbotCreateResult {
    Message: ChatbotMessageOrig[]
}
