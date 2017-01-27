export const interval = (to: number) => {
  return Array(to).fill(0).map((_: any, i: number) => i);
};

export const range = (from: number, to: number) => {
  return interval(to).slice(from);
};

export const values = (obj: any) => {
  return Object.keys(obj).map(key => obj[key]);
};
