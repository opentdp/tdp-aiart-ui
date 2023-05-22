import { HttpClient } from "@/api/basic/http"

export class ChatbotModel extends HttpClient {
    public create(rq: ChatbotCreateParam): Promise<ChatbotCreateResult> {
        return this.post("/chatbot/create", rq)
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
    Messages: ChatbotMessageOrig[]
}
