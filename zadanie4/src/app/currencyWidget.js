export default function CurrencyWidget(props) {
  if (!props.currency) return null;
  if (props.currency.short == "EUR") return null;

  const roundSmall = (num) => {
    let multi = 100;
    while (Math.round(num * multi) / multi <= 0 && multi < 100000000) {
      multi *= 10;
    }
    return Math.round(num * multi) / multi;
  };

  return (
    <div className="grid grid-cols-[1fr_3rem_1fr] mb-8">
      <p>1 EUR</p>
      <p className="text-center">=</p>
      <p className="text-end">{`${props.currency.rate} ${props.currency.short}`}</p>
      <p>{`1 ${props.currency.short}`}</p>
      <p className="text-center">=</p>
      <p className="text-end">{`${roundSmall(1 / props.currency.rate)} EUR`}</p>
    </div>
  );
}
