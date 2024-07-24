interface Stateable {
  key: string;
}

type Data<D> = {
  [K in keyof D]: D[K];
};

type Fn = (...args: any[]) => Stateable;

type Fns<F> = {
  [K in keyof F]: Fn;
};

function State<K extends string, D extends Data<D>, F extends Fns<F>>(
  key: K,
  data: D,
  fns: F
) {
  return {
    ...fns,
    ...data,
    key,
  };
}

function Idle(){
    return State('idle', {progress:0}, {PowerOn});
}

function PowerOn(){
    return {
        key:"powerOn"as const,
        process:0
    }
}

export function Start(){
    return Idle();
}
