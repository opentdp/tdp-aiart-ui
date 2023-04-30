import { HttpClient } from "@/api/basic/http"

export class ChatbotModel extends HttpClient {
    public message(rq: ChatMessageOrig[]): Promise<ChatMessageItem> {
        return this.post("/chatbot/message", rq)
    }
}

export interface ChatMessageOrig {
    content: string
    role?: string
}

export interface ChatMessageItem {
    Item: ChatMessageOrig
}
