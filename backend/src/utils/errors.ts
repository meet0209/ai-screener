export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return (...args: Parameters<T>): void => {
    fn(...args).catch((err) => {
      const next = args[args.length - 1];
      if (typeof next === 'function') {
        next(err);
      }
    });
  };
};
