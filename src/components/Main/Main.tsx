import { useAudioContext } from "../AudioContextProvider";
import { NoAudioMessage } from "../NoAudioMessage";

const Keyboard = () => <>Keyboard</>;

export const Main = () => {
  const AudioContext = useAudioContext();

  return !!AudioContext ? <Keyboard /> : <NoAudioMessage />;
};
