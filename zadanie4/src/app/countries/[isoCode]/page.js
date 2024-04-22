export default async function CountryPage({ params }) {
  const res = await fetch(
    "https://restcountries.com/v3.1/alpha/" + params.isoCode
  );
  const country = (await res.json())[0];
  console.log(country);

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={`https://countryflagsapi.netlify.app/flag/${params.isoCode}.svg`}
          className="w-64 mb-5"
        ></img>
        <h1 className="font-bold text-white text-4xl">{country.name.common}</h1>
        <h1 className="italic text-zinc-300 text-lg">
          {country.name.official}
        </h1>
      </div>
    </>
  );
}
