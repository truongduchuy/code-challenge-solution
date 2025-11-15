export type Option = {
    label: string;
    value: string;
}

export type Token = {
    currency: string;
    price: number;
    date: string;
}

export type TokenOption = Option & Token
