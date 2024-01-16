export const convertNumbers = (n, rtl) => {
  if (!rtl || !n) {
    return n;
  }

  let num = String(n);
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  if (num.startsWith('.')) {
    let x = num.replace('.', '0.');
    num = x;
  }
  let z = num.replace('.', ',');
  num = z;
  return num.replace(/[0-9]/g, w => id[+w]);
};
