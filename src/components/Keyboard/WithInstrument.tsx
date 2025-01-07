// import { SoundfontProvider } from "../../adapters/Soundfont";
// import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProviderClass";
import { withInstrument } from "../../adapters/Soundfont";
import { useInstrument } from "../../state/Instrument";
import { useAudioContext } from "../AudioContextProvider";
import { Keyboard } from "./Keyboard";

const WrappedKeyboard = withInstrument(Keyboard);

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();

  // return (
  //   <SoundfontProvider
  //     AudioContext={AudioContext}
  //     instrument={instrument}
  //     render={(props) => <Keyboard {...props} />}
  //   />
  // );

  return (
    <WrappedKeyboard AudioContext={AudioContext} instrument={instrument} />
  );
};
