type Handlers = Record<string, (...arg: any[]) => Promise<any>>;

class EventsHandler<THandlers extends Handlers> {
  constructor(private handlers: THandlers) {}

  //Infers "key" => "function parameters" and adds TS hints!
  dispatch = async <TType extends keyof THandlers>(
    type: TType,
    ...payload: Parameters<THandlers[TType]>
  ): Promise<ReturnType<THandlers[TType]>> => {
    return await this.handlers[type](...payload);
  };
}

const handlers = {
  create_invoice: async (name: string, description: string) => {
    // Complex Logic.
    return Promise.resolve({ name, description });
  },
  change_invoice_status: (name: string, description: string) => {
    // Complex Logic.
    return Promise.resolve({ name, description });
  },
  send_emails: (name: string) => {
    // Complex Logic.
    return Promise.resolve(new Date().toISOString() + name);
  },
} satisfies Handlers;

const createInvoiceController = async (payload: {
  name: string;
  description: string;
}) => {
  const { dispatch } = new EventsHandler(handlers);

  await Promise.all([
    dispatch("create_invoice", payload.name, payload.description),
    dispatch("change_invoice_status", payload.name, payload.description),
  ]);

  return await dispatch("send_emails", payload.name);
};
