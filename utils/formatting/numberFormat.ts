/**
 * 가격에 1000단위로 콤마 붙인 후 "원"을 붙여 리턴한다.
 * @param {number} n - 가격
 * @returns {string} ex) 2,000,000원
 */
export function numberWithCommas(n: number): string {
  const won = '원';
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + won;
}

/**
 * 휴대폰 번호에 하이픈 추가해서 리턴한다.
 * @param {string} phoneNumber ex) 01012345678
 * @returns {string} ex) 010-1234-5678
 */
export function phoneNumberWithHyphen(phoneNumber: string) {
  const match = phoneNumber?.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
}
