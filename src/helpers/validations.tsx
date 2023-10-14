//인증 메시지 획일화 함수
export const requiredRule = (value: string) => {
  return [{ required: true, message: `${value} is empty` }];
};
