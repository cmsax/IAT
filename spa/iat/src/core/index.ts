// Shuffle given list, with side effect.
export const Shuffle = (list: any[]): any[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
};
