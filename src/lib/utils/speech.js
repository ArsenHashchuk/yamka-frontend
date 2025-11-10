export const unlockSpeech = () => {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  if (synth.speaking || synth.pending) return;

  const utter = new SpeechSynthesisUtterance("test");
  utter.volume = 0;
  console.log(`---TESTING SPEECH IN UNLOCKSPEECH---`);

  synth.speak(utter);
};

export const speak = (text, onEndCallback = () => {}) => {
  if (typeof window === "undefined") {
    onEndCallback();
    return;
  }

  const synth = window.speechSynthesis;
  if (!synth) {
    console.error("Speech synthesis not supported.");
    onEndCallback();
    return;
  }

  synth.cancel();

  const voices = synth.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  const utter = new SpeechSynthesisUtterance(text);

  if (voices.length > 0) {
    utter.voice = voices[0];
  }

  utter.onend = () => {
    console.log("Speech finished.");
    onEndCallback();
  };

  utter.onerror = (e) => {
    console.error("Speech synthesis error:", e);
    onEndCallback();
  };

  console.log(`---TESTING SPEECH IN SPEAK---`);
  console.log(`Utter: ${utter}`);
  console.log(`Synth: ${synth}`);
  console.log(`---TESTING SPEECH IN SPEAK---`);

  synth.speak(utter);
};
