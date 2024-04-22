import Link from "next/link";

export default async function Countries(params) {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  console.log(countries);

  const listItems = countries.map((c) => (
    <li>
      <Link href={`/countries/${c.cca2}`}>{c.name.common}</Link>
    </li>
  ));

  return (
    <div>
      <h1>CounTrees</h1>
      <ul>{listItems}</ul>
    </div>
  );
}
