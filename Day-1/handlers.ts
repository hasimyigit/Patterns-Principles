import { Event, EventType } from "./events";

export class CreateInvoiceHandler {
  handle(event: Event<EventType.CreateInvoice>) {
    console.log(`Creating invoice with ID ${event.payload.invoiceId} for amount
        ${event.payload.amount}`);
    // Implement invoice creation logic here
  }
}

export class ChangeStatusHandler {
  handle(event: Event<EventType.ChangeStatus>) {
    console.log(`Changing status of invoice ${event.payload.invoiceId} to
        ${event.payload.status}`);
    // Implement status change logic here
  }
}

export class SendEmailHandler {
  handle(event: Event<EventType.SendEmail>) {
    console.log(`Send email to ${event.payload.email} for invoice
        ${event.payload.invoiceId}`);
    // Implement email sending logic here
  }
}
