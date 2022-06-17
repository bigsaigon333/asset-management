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

export const toJSON = (value: unknown): any => {
  if (value !== null && typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map((el) => toJSON(el));
    } else {
      // @ts-ignore
      if ("toJSON" in value && typeof value.toJSON === "function") {
        // @ts-ignore
        return value.toJSON();
      } else {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, toJSON(val)])
        );
      }
    }
  } else {
    return value;
  }
};

export const parse = <T>(value: string): T => {
  return JSON.parse(value, (key, value) =>
    typeof value === "string" && !Number.isNaN(Date.parse(value))
      ? new Date(Date.parse(value))
      : value
  );
};
