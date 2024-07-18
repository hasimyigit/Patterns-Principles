import { Event, EventType } from "./events";
import {
  CreateInvoiceHandler,
  ChangeStatusHandler,
  SendEmailHandler,
} from "./handlers";

export class EventDispatcher {
  private handlers = {
    [EventType.CreateInvoice]: new CreateInvoiceHandler(),
    [EventType.ChangeStatus]: new ChangeStatusHandler(),
    [EventType.SendEmail]: new SendEmailHandler(),
  };

  dispatch<T extends EventType>(event: Event<T>) {
    const handler = this.handlers[event.type];
    handler.handle(event);
  }
}
