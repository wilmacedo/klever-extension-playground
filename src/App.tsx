import { useState } from "react";
import { Accordion } from "./components/Accordion";
import { providers } from "./providers";

function App() {
  const [currentProvider, setCurrentProvider] = useState(0);

  function handleProvider(index: number) {
    if (currentProvider === index) return;

    setCurrentProvider(index);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-xs p-4 border border-slate-300 rounded-md shadow-sm">
        <div>
          <h1 className="font-bold text-lg">Klever Extension Playground</h1>
          <h3 className="text-sm">Testing function and call methods</h3>
        </div>
        <div className="mt-2 mb-6 h-[1px] w-full bg-slate-300" />

        <div>
          <section className="flex justify-between">
            <label className="text-sm" htmlFor="providers">
              Current provider{" "}
            </label>
            <select
              className="px-1.5 py-0.5 border border-slate-300 rounded-md text-sm focus:outline-slate-400"
              name="providers"
              id="providers"
              defaultValue={providers[currentProvider].method}
            >
              {providers.map(({ method, name }, index) => (
                <option
                  key={index}
                  value={method}
                  onClick={() => handleProvider(index)}
                >
                  {name}
                </option>
              ))}
            </select>
          </section>

          <section className="mt-6">
            <Accordion title="Transaction data">
              {/* TODO: Add transaction data inputs */}
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
