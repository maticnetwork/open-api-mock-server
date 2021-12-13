
import { Controller, DefaultWorker, Worker, textResult, Route, jsonResult, HTTP_METHOD } from "fortjs";
import { service } from "../services";

export class FxPortalV1Controller extends Controller {

    @DefaultWorker()
    async index() {

    }

    @Worker(HTTP_METHOD.Get)
    @Route("/mapping")
    async mapping() {
        const tokens = service.fxPortal.getToken();
        return jsonResult(
            {
                success: true,
                result: tokens
            }
        )
    }

    @Worker(HTTP_METHOD.Post)
    @Route("/mapping")
    async saveToken() {
        const token = this.body;
        service.fxPortal.addToken(token as any);
        return textResult("saved");
    }

    @Worker(HTTP_METHOD.Get)
    @Route("/deposit")
    async getDepositList() {
        const userAddress: string = this.query.userAddress || ''
        const deposits: any[] = service.fxPortal.getDeposit(userAddress);
        return jsonResult({
            success: true,
            result: deposits,
            "paginationData": {
                "page": 0,
                "pageSize": 50,
                "totalCount": deposits.length,
                "hasNextPage": false
            }
        })
    }

    @Worker(HTTP_METHOD.Post)
    @Route("/deposit")
    async saveDeposit() {
        service.fxPortal.saveDeposit(
            this.body
        );
        return textResult("saved");
    }

    @Worker(HTTP_METHOD.Post)
    @Route("/withdraw")
    async saveWithdraw() {
        service.fxPortal.saveWithdraw(
            this.body
        );
        return textResult("saved");
    }

    @Worker(HTTP_METHOD.Put)
    @Route("/withdraw")
    async updateWithdraw() {
        service.fxPortal.updateWithdraw(
            this.body
        );
        return textResult("updated");
    }

    @Worker(HTTP_METHOD.Get)
    @Route("/withdraw")
    async getWithdrawList() {
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
