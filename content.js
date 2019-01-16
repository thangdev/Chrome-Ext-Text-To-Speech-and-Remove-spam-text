chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.action === 'textToSpeech') {
        let text = window.getSelection().toString();
        sendResponse({
            data: text
        })
    }
})