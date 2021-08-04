export const compareVersion = (v1, v2) => {
  const s1 = v1.split('.');
  const s2 = v2.split('.');

  const length = Math.max(s1.length, s2.length);

  for (let i = 0; i < length; i++) {
    if (Number.parseInt(s1[i]) > Number.parseInt(s2[i])) {
      return 1;
    }

  if (Number.parseInt(s1[i]) < Number.parseInt(s2[i])) {
      return -1;
    }
  }

  return 0;
};
