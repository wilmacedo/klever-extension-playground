import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Accordion } from "./components/Accordion";
import { Button } from "./components/Button";
import { providers } from "./providers";

function App() {
  const [currentProvider, setCurrentProvider] = useState(0);
  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const [address, setAddress] = useState("");

  function getCurrentProvider() {
    if (currentProvider === 0) return null;

    return providers[currentProvider];
  }

  function handleProvider(event: ChangeEvent<HTMLSelectElement>) {
    const method = event.target.value;
    const provider = providers.find((p) => p.method === method);
    if (!provider) return;

    if (providers[currentProvider].method === provider.method) return;

    setCurrentProvider(providers.findIndex((p) => p.method === method));
  }

  async function handleInitialize() {
    const provider = getCurrentProvider();
    if (provider === null) return;

    try {
      setIsLoadingProvider(true);
      await (window as any)[provider.method].initialize();
      setIsLoadingProvider(false);
      setAddress((window as any)[provider.method].address);
    } catch (error) {
      console.log(error);
    }
  }

  function isInitialize() {
    return address.length > 0;
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
              defaultValue={getCurrentProvider()?.name}
              onChange={handleProvider}
            >
              {providers.map(({ method, name }, index) => (
                <option
                  key={index}
                  value={method}
                  {...(currentProvider === index && { selected: true })}
                >
                  {name}
                </option>
              ))}
            </select>
          </section>

          {isInitialize() && (
            <section className="mt-2 flex items-center justify-between">
              <span className="text-sm">Address</span>
              <span className="text-sm max-w-[8rem] truncate font-semibold">
                {address}
              </span>
            </section>
          )}

          {!isInitialize() && (
            <Button
              loading={isLoadingProvider}
              disabled={isLoadingProvider || getCurrentProvider() === null}
              onClick={handleInitialize}
            >
              {isLoadingProvider ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <span>Connect</span>
              )}
            </Button>
          )}

          {isInitialize() && (
            <section className="mt-6">
              <Accordion title="Transaction data">
                <div className="flex items-center justify-between">
                  <label className="text-sm" htmlFor="amount">
                    Amount
                  </label>
                  <input
                    className="px-1.5 py-0.5 text-sm border border-slate-300 rounded-md"
                    type="text"
                  />
                </div>
                {/* TODO: Add transaction data inputs */}
              </Accordion>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
