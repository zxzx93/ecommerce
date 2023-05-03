/**
 * 가격에 1000단위로 콤마 붙인 후 "원"을 붙여 리턴한다.
 * @param {number} n - 가격
 * @returns {string} ex) 2,000,000원
 */
function numberWithCommas(n: number): string {
  const won = '원';
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + won;
}

export default numberWithCommas;
