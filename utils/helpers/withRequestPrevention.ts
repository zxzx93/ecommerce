type HandlerFunction = (...args: any[]) => Promise<any>;

interface RequestOptions {
  loadingDelay?: number;
}

/**
 * 함수가 이전 요청이 완료되지 않았거나 로딩 지연시간이 끝나지 않은 경우를 방지함으로
 * 클라이언트 측에서 여러번의 빠른 요청을 제한하려는 상황에 쓰인다.
 *
 * @function withRequestPrevention
 * @param {HandlerFunction} handler - 요청을 실행할 함수
 * @param {RequestOptions} [options] - 딜레이 시간 설정
 * @returns {HandlerFunction}
 */

function withRequestPrevention(
  handler: HandlerFunction,
  options: RequestOptions = {}
): HandlerFunction {
  const { loadingDelay = 1000 } = options;
  let isRequesting = false;
  let timeoutId: NodeJS.Timeout | null = null;

  return async (...args) => {
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
