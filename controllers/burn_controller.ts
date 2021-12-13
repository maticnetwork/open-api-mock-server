
import { Controller, DefaultWorker, Worker, textResult, HTTP_METHOD, Route, jsonResult } from "fortjs";
import { service } from "../services";

export class BurnController extends Controller {

    @DefaultWorker()
    async index() {

    }

    @Worker(HTTP_METHOD.Get)
    @Route("/address")
    async getByAddress() {

        const userAddress: string = this.query.userAddress || '';
        const result: any[] = service.fxPortal.getWithdraw(userAddress);
        return jsonResult({
            success: true,
            result: result,
            "paginationData": {
                "page": 0,
                "pageSize": 50,
                "totalCount": result.length,
                "hasNextPage": false
            }
        })
    }
}
