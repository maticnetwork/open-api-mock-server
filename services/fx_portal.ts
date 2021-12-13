import { IToken } from "../interfaces";

export class FxPortalService {
    constructor(private db_) {
        this.db_.default({
            tokens: [], deposits: [],
            withdraws: []
        });
    }

    getToken() {
        const data = this.db_.get("tokens").value()
        // console.log('data', data);   
        return data;
    }

    addToken(token: IToken) {
        token.id = new Date().getTime().toString();
        token.timestamp = new Date().toISOString();
        this.db_.get("tokens").push(token);
        this.db_.save();
    }

    getDeposit(userAddress) {
        userAddress = userAddress.toLowerCase();
        return this.db_.get("deposits").filter(item => {
            return item.userAddress.toLowerCase() === userAddress
        }).value();
    }

    saveDeposit(depositData) {
        const timestamp = new Date().getTime();
        depositData.id = timestamp.toString();
        depositData.timestamp = timestamp;
        this.db_.get("deposits").push(
            depositData
        )
        this.db_.save();
    }

    saveWithdraw(data) {
        const timestamp = new Date().getTime();
        data.id = timestamp.toString();
        data.timestamp = timestamp;
        this.db_.get("withdraws").push(
            data
        )
        this.db_.save();
    }

    updateWithdraw(data) {
        
        const userAddress = data.userAddress.toLowerCase();
        const withdrawList = this.db_.get("withdraws").value();
        const index = withdrawList.findIndex(item => {
            return item.userAddress.toLowerCase() === userAddress
        });
        const savedDataRef = this.db_.get("withdraws").get(index);
        const savedData = savedDataRef.value();
        Object.assign(savedData, data);
        savedDataRef.set(savedDataRef.value());
        this.db_.save();
    }

    getWithdraw(userAddress) {
        userAddress = userAddress.toLowerCase();
        return this.db_.get("withdraws").filter(item => {
            if (item.userAddress.toLowerCase() === userAddress) {
                return true
            }
            return false
        }).value();
    }

    addDeposit(deposit) {
        this.db_.get("deposits").push(deposit)
        this.db_.save();
    }
}
