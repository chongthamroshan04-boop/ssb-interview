const useBrowserVoice = () => {

    const speak = (text) => {

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;

        utterance.pitch = 1;

        speechSynthesis.speak(utterance);
    };

    return { speak };
};

export default useBrowserVoice;