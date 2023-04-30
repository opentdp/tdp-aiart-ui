import { HttpClient } from "@/api/basic/http"

export class ChatbotModel extends HttpClient {
    public message(rq: ChatMessageOrig[]): Promise<ChatMessageOrig> {
        return this.post("/chatbot/message", rq)
    }
}

export interface ChatMessageOrig {
    content: string
    role?: string
}
