export default function delay(callback: (...args: any[]) => void, ms: number) {
    let timer: any = 0;
    return function (this: any, ...args: any[]) {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
}