export const isSomeFieldFull = (event: any) => {
  if (!event) return;
  return Object.values(event).some((item: any) => item.length > 0);
};
