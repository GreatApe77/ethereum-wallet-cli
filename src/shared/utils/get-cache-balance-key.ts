type Props = {
    accountAddress: string;
    networkdId: string | number;
    accountIndex:number | string;
}
export function getCacheBalanceKey({accountAddress, networkdId, accountIndex}: Props): string {
    return `${accountAddress}-${networkdId}-${accountIndex}-balance`;
}