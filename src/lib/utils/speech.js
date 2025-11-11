export const unlockSpeech = () => {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  if (synth.speaking || synth.pending) return;

  const utter = new SpeechSynthesisUtterance("test");
  utter.volume = 0;

  synth.speak(utter);
};

export const speak = (text, locale = "en", onEndCallback = () => {}) => {
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

  let voices = synth.getVoices();

  if (!voices || voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speak(text, locale, onEndCallback);
    };
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);

  const isUkrainian = /[А-Яа-яЇїІіЄєҐґ]/.test(text);
  const targetLang = isUkrainian ? "uk" : "en";

  let voice =
    voices.find(
      (v) => v.lang.toLowerCase().startsWith(targetLang) && v.localService
    ) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(targetLang)) ||
    null;

  if (!voice) {
    console.warn("No matching voice for:", targetLang, "Using fallback voice.");
    voice = voices[0];
  }

  utter.voice = voice;
  utter.lang = voice.lang;

  if (utter.lang !== voice.lang) utter.lang = voice.lang;

  utter.onend = () => {
    onEndCallback();
  };

  utter.onerror = (e) => {
    console.error("Speech synthesis error:", e);
    onEndCallback();
  };

  utter.volume = 0.5;
  synth.speak(utter);
};
