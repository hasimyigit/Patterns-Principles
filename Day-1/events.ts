export enum EventType {
  CreateInvoice = "CREATE_INVOICE",
  ChangeStatus = "CHANGE_STATUS",
  SendEmail = "SEND_EMAIL",
}

export interface EventPayload {
  [EventType.CreateInvoice]: { invoiceId: string; amount: number };
  [EventType.ChangeStatus]: { invoiceId: string; status: string };
  [EventType.SendEmail]: { invoiceId: string; email: string };
}

export interface Event<T extends EventType> {
  type: T;
  payload: EventPayload[T];
}
