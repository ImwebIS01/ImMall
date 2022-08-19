interface OrderInterface {
  readonly id: number;

  readonly code: string;

  readonly siteCode: string;

  readonly orderNumber: string;

  readonly ordererEmail: string;

  readonly ordererName: string;

  readonly ordererCall: string;

  readonly ordererCall2: string;

  readonly orderTime: Date;

  readonly completeTime: Date;

  readonly count: number;

  readonly price: number;
}

export class Order implements OrderInterface {
  readonly id: number;

  readonly code: string;

  readonly siteCode: string;

  readonly orderNumber: string;

  readonly ordererEmail: string;

  readonly ordererName: string;

  readonly ordererCall: string;

  readonly ordererCall2: string;

  readonly orderTime: Date;

  readonly completeTime: Date;

  readonly count: number;

  readonly price: number;

  constructor(
    id: number,
    code: string,
    siteCode: string,
    orderNumber: string,
    ordererEmail: string,
    ordererName: string,
    ordererCall: string,
    ordererCall2: string,
    orderTime: Date,
    completeTime: Date,
    count: number,
    price: number
  ) {
    this.id = id;
    this.code = code;
    this.siteCode = siteCode;
    this.orderNumber = orderNumber;
    this.ordererEmail = ordererEmail;
    this.ordererName = ordererName;
    this.ordererCall = ordererCall;
    this.ordererCall2 = ordererCall2;
    this.orderTime = orderTime;
    this.completeTime = completeTime;
    this.count = count;
    this.price = price;
  }
}
