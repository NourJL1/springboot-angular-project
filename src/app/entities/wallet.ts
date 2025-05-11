// src/app/entities/wallet.ts
export class Wallet {
  status: any;
  constructor(
    public id: number,
    public amount: number,
    public currency: string,
    public WalletStatu: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED',
    public walletType: 'CUSTOMER' | 'INTERNE' | 'MERCHANT'
  ) {}
}
export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED'
}

export enum WalletType {
  PERSONAL = 'CUSTOMER',
  BUSINESS = 'INTERNE',
  MERCHANT = 'MERCHANT'
}