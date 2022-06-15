export const formatDate = (date: Date): string => {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
};

export const formatRate = (rate: number): string => {
  return `${(rate * 100).toFixed(2)}%`;
};

export const add = (a: number, b: number): number => a + b;
