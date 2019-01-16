var supportMsg = document.getElementById('msg');

// Get the 'speak' button
var button = document.getElementById('speak');
// Get the text input element.
var speechMsgInput = document.getElementById('speech-msg');
// Get the voice select element.
var voiceSelect = document.getElementById('voice');
// Fetch the list of voices and populate the voice options.
function loadVoices() {
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices();
    // Loop through each of the voices.
    voices.forEach(function (voice, i) {
        // Create a new option element.
        var option = document.createElement('option');
        // Set the options value and text.
        option.value = voice.name;
        option.innerHTML = voice.name;
        // Add the option to the voice selector.
        voiceSelect.appendChild(option);
    });
}

loadVoices();
window.speechSynthesis.onvoiceschanged = function (e) {
    loadVoices();
};

function speak(text) {
    // Create a new instance of SpeechSynthesisUtterance.
    var msg = new SpeechSynthesisUtterance();
    // Set the text.
    msg.text = text;
    if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function (voice) {
            return voice.name == voiceSelect.value;
        })[0];
    }
    window.speechSynthesis.speak(msg);
}

// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function (e) {
    if (speechMsgInput.value.length > 0) {
        speak(speechMsgInput.value);
    }
    text = window.getSelection().toString();
    console.log(text)
});
sendMessage();

function sendMessage() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "textToSpeech"
        }, function (response) {
            speechMsgInput.value = response.data;
            console.log(response.data)
        });
    });

}