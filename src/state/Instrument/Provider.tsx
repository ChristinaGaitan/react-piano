import { FunctionComponent, PropsWithChildren, useState } from "react";
import { DEFAULT_INSTRUMENT } from "../../domain/sound";
import { InstrumentContext } from "./Context";

export const InstrumentContextProvider: FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};
