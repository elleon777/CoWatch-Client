export const videoTimeFormat = (sec: number): string => {
  return [Math.floor(sec / 60 / 60) || null, Math.floor((sec / 60) % 60), Math.floor(sec % 60)]
    .filter((num) => num !== null)
    .join(':')
    .replace(/\b(\d)\b/g, '0$1');
};
