import { EventDispatcher } from "./dispatcher";
import { EventType, Event } from "./events";

const dispatcher = new EventDispatcher();

const createInvoiceEvent: Event<EventType.CreateInvoice> = {
  type: EventType.CreateInvoice,
  payload: { invoiceId: "123", amount: 500 },
};

const changeStatusEvent: Event<EventType.ChangeStatus> = {
  type: EventType.ChangeStatus,
  payload: { invoiceId: "123", status: "PAID" },
};

const sendEmailEvent: Event<EventType.SendEmail> = {
  type: EventType.SendEmail,
  payload: { invoiceId: "123", email: "customer@example.com" },
};

dispatcher.dispatch(createInvoiceEvent);
dispatcher.dispatch(changeStatusEvent);
dispatcher.dispatch(sendEmailEvent);
