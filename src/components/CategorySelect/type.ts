export const categorys = [
  '일반소설',
  '로멘스/드라마',
  '코믹',
  '시/수필/에세이',
  '판타지/SF',
  '퓨전',
  '액션/무협',
  '스포츠/학원',
  '공포/추리',
];

export interface CategorySelectProps {
  style?: {
    marginTop?: string;
  };

  isError: boolean;
  errorText: string;
}
