
import { Wall, textResult, HTTP_METHOD } from "fortjs";

export class CorsWall extends Wall {
    async onIncoming() {
        this.response.setHeader("Access-Control-Allow-Origin", "*")
        this.response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token, authorization")
        this.response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT")
        if (this.request.method === HTTP_METHOD.Options) {
            return textResult("")
        }
    }
}
