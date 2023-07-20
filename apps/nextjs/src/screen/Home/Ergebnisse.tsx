import { ErgebnisseItem } from "./components";

const ArrTest = [1, 1, 1];

export default function Ergebnisse() {
  return (
    <div className="mt-24 flex h-full w-full flex-col items-center p-4">
      <div>
        <h2 className="mb-5 text-4xl font-bold  text-grey">Today</h2>
        {ArrTest.map((_, i) => (
          <div key={i}>
            <ErgebnisseItem />
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-5 text-4xl font-bold  text-grey">Earlier</h2>
        {ArrTest.map((_, i) => (
          <div key={i}>
            <ErgebnisseItem />
          </div>
        ))}
      </div>
    </div>
  );
}
