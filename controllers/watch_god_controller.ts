
import { Controller, DefaultWorker, Worker, textResult, HTTP_METHOD, Route, jsonResult } from "fortjs";
import { service } from "../services";

export class WatchGodController extends Controller {

    @Worker(HTTP_METHOD.Get)
    @Route("/history")
    async getHistory() {
        const address = this.query.from;
        return jsonResult(
            service.watchGod.getHistory(address)
            // service.watchGod.getHistoryByUserAddress(address)
        )
    }

    @Worker(HTTP_METHOD.Post)
    @Route("/watch")
    async watch() {
        const body = this.body;
        service.watchGod.add(body as any)
        return 
    }

    @Worker(HTTP_METHOD.Put)
    @Route("/watch/{txHash}")
    async updateWatch() {
        const body = this.body;
        const txHash = this.param.txHash;
        service.watchGod.update(txHash, body as any)
        return
    }
}
