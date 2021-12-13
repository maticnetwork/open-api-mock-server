import { IWatchGodTx } from "../interfaces/watch_god_tx";

export class WatchGodService {
    constructor(private db_) {
        this.db_.default({
            history: []
        });
    }

    getHistory(address: string) {
        return this.db_.get("history").value();
    }

    getHistoryByUserAddress(address: string) {
        return this.db_.get("history").filter(item => {
            if (item.userAddress === address) {
                return true
            }
            return false
        }).value();
    }

    add(watchData: IWatchGodTx) {
        this.db_.get("history").push(watchData);
        this.db_.save();
    }

    update(txHash, watchData: IWatchGodTx) {
        const history = this.db_.get("history");
        const index = history.findIndex(q => q.hash === txHash);
        const savedData = history.get(0).value();
        Object.assign(savedData, watchData);
        history.get(0).set(savedData);
        this.db_.save();
    }
}
