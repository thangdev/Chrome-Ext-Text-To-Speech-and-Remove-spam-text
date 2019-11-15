chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.action === "textToSpeech") {
    console.log("ahihi :::");
    let text = window.getSelection().toString();
    sendResponse({
      data: text
    });
  } else if (req.action === "remove") {
    console.log("req::", req);
    let commentList = document.getElementsByClassName("_3l3x");
    commentList = [...commentList];
    let check = false;
    if (req.text == "none") {
      commentList.map(cmt => {
        text = cmt.innerText.toLowerCase();
        if (/c(.*) k(.*) th(.*)/gm.test(text)) {
          cmt.innerHTML = "spamed";
          check = true;
        }
      });
      if (check) alert("Removed spam text!");
    } else if (req.text) {
      commentList.map(cmt => {
        text = cmt.innerText.toLowerCase();
        if (new RegExp(`${req.text}`, "g").test(text)) {
          cmt.innerHTML = "spamed";
          check = true;
        }
      });
      if (check) alert("Removed " + req.text);
    } else alert("Ko tìm thấy cụm từ CKTP!");
    sendResponse({
      data: "removed"
    });
  }
});
