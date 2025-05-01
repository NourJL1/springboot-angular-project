// src/app/entities/wallet.ts
export class Wallet {
  constructor(
    public id: number,
    public amount: number,
    public currency: string,
    public status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED',
    public walletType: 'CUSTOMER' | 'INTERNE' | 'MERCHANT'
  ) {}
}