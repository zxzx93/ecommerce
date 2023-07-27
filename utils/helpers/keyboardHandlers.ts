// Enter 키 또는 스페이스바가 눌렸는지 확인하고, 눌렀을 경우 handleClick 함수를 호출
const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, cb: () => void) => {
  if (e.key === 'Enter' || e.key === '') {
    e.preventDefault();
    cb();
  }
};

export default handleKeyDown;
