import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import { Component, ComponentType } from "react";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";

type InjectedProps = {
  loading: boolean;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
};

type ProviderProps = {
  AudioContext: AudioContextType;
  instrument: InstrumentName;
};

type ProviderState = {
  loading: boolean;
  current: Optional<InstrumentName>;
};

export function withInstrument<TProps extends InjectedProps = InjectedProps>(
  WrappedComponent: ComponentType<TProps>,
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  return class WithInstrument extends Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps) {
      super(props);

      const { AudioContext } = this.props;
      this.audio = new AudioContext();
    }

    public static defaultProps = {
      instrument: DEFAULT_INSTRUMENT,
    };

    private audio: AudioContext;
    private player: Optional<Player> = null;
    private activeNodes: AudioNodesRegistry = {};

    public static displayName = `withInstrument(${displayName})`;
    public state: ProviderState = {
      loading: false,
      current: null,
    };

    private resume = async () => {
      return this.audio.state === "suspended"
        ? await this.audio.resume()
        : Promise.resolve();
    };

    private load = async (instrument: InstrumentName) => {
      this.setState({ loading: true });
      this.player = await Soundfont.instrument(this.audio, instrument);

      this.setState({ loading: false, current: instrument });
    };

    public play = async (note: MidiValue) => {
      await this.resume();

      if (!this.player) return;

      const node = this.player.play(note.toString());
      this.activeNodes = { ...this.activeNodes, [note]: node };
    };

    public stop = async (note: MidiValue) => {
      await this.resume();
      if (!this.activeNodes[note]) return;

      this.activeNodes[note]!.stop();
      this.activeNodes = { ...this.activeNodes, [note]: null };
    };

    public componentDidMount(): void {
      const { instrument } = this.props;
      this.load(instrument);
    }

    public shouldComponentUpdate(
      nextProps: Readonly<ProviderProps>,
      nextState: Readonly<ProviderState>,
      nextContext: any,
    ): boolean {
      return this.state.current !== nextProps.instrument;
    }

    public componentDidUpdate(
      prevProps: Readonly<ProviderProps>,
      prevState: Readonly<ProviderState>,
      snapshot?: any,
    ): void {
      const { instrument } = this.props;
      if (instrument && instrument !== prevProps.instrument) {
        this.load(instrument);
      }
    }

    public render() {
      const injected = {
        loading: this.state.loading,
        play: this.play,
        stop: this.stop,
      } as InjectedProps;

      return <WrappedComponent {...(injected as TProps)} />;
    }
  };
}
