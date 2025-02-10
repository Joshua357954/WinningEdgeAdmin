export const ToDate = (timestamp) => {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const finaldate = new Date(milliseconds);
  return finaldate.toLocaleString();
};

export const prettifyAmountInNaira = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    //   maximumFractionDigits: 0,
  }).format(amount);
};
