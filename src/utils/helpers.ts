export const formatDate = (date: string) => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleDateString("en-GB");
};
