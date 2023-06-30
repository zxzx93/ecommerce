type HandlerFunction = (...args: any[]) => Promise<any>;

interface RequestOptions {
  loadingDelay?: number;
}

function withRequestPrevention(
  handler: HandlerFunction,
  options: RequestOptions = {}
): HandlerFunction {
  const { loadingDelay = 2000 } = options;
  let isRequesting = false;
  let timeoutId: NodeJS.Timeout | null = null;

  return async (...args: any[]): Promise<any> => {
    if (isRequesting) return;

    isRequesting = true;
    if (timeoutId) clearTimeout(timeoutId);

    try {
      await handler(...args);
    } finally {
      timeoutId = setTimeout(() => {
        isRequesting = false;
      }, loadingDelay);
    }
  };
}

export default withRequestPrevention;
