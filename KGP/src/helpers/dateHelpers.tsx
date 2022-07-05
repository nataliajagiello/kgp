const formatDate = (date: Date) => {
  const pad = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };
  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1,
  )}.${date.getFullYear()}`;
};

export {formatDate};
