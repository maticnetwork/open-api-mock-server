export interface IToken {
    id: string;
    childToken: string;
    contractAddress: string;
    rootToken: string;
    timestamp: string;
    tokenDecimal: number;
    tokenName: string;
    tokenSymbol: string;
    tokenType: string;
}
