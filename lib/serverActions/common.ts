export function errorHandler<T extends any[], R>(
  scope: string,
  asyncFunc: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await asyncFunc(...args);
    } catch (err) {
      console.error(`${scope} ERROR`, err);
      throw err;
    }
  };
}
