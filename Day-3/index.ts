type Handlers = Record<string, (...arg: any[]) => Promise<any>>;

type Subscription<THandlers extends Handlers> = (
  type: keyof THandlers,
  ...payload: Parameters<THandlers[keyof THandlers]>
) => void;

class EventsHandler<THandlers extends Handlers> {
  private subscriptions = new Map<string, Subscription<THandlers>>();

  constructor(private handlers: THandlers) {}

  dispatch = async <TType extends keyof THandlers>(
    type: TType,
    ...payload: Parameters<THandlers[TType]>
  ): Promise<ReturnType<THandlers[TType]>> => {
    this.subscriptions.forEach((sub) => sub(type, ...payload));
    const result = await this.handlers[type](...payload);
    return result;
  };

  subscribe = (subscription: Subscription<THandlers>): string => {
    const id = new Date().toDateString();

    this.subscriptions.set(id, subscription);

    return id;
  };

  unsubscribeAll = (): void => {
    this.subscriptions.clear();
  };

  unsubscribe = (id: string): void => {
    this.subscriptions.delete(id);
  };
}

const handlers = {
  create_invoice: async (name: string, description: string) => {
    //Complex Logic
    return Promise.resolve({ name, description });
  },
  change_invoice_status: (name: string, description: string) => {
    //Complex Logic
    return Promise.resolve({ name, description });
  },
  send_emails: (name: string) => {
    //Complex Logic
    return Promise.resolve(new Date().toISOString() + name);
  },
} satisfies Handlers;

const { dispatch, subscribe, unsubscribe, unsubscribeAll } = new EventsHandler(
  handlers
);

const createInvoiceController = async (payload: {
  name: string;
  description: string;
}) => {
  dispatch("change_invoice_status", payload.name, payload.description);

  await Promise.all([
    dispatch("create_invoice", payload.name, payload.description),
    dispatch("change_invoice_status", payload.name, payload.description),
  ]);

  return await dispatch("send_emails", payload.name);
};

// In other application place

const id = subscribe((type, ...payload) => {
  if (type === "send_emails") {
    console.log("Use may payload to some app logic", payload);
  }
});

unsubscribe(id);
unsubscribeAll();
