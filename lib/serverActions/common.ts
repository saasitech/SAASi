export const getErrorHandler =
  (scpope: string) =>
  (error: any, operation: string, rethrow = true) => {
    console.error(`Error in ${scpope} on ${operation} operation`, error);
    if (rethrow) throw error;
  };
