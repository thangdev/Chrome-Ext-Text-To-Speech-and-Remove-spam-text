chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.action === "textToSpeech") {
    console.log("ahihi :::");
    let text = window.getSelection().toString();
    sendResponse({
      data: text
    });
  } else if (req.action === "remove") {
    console.log("req::", req);
    if (req.text == "none") {
      x = document.body.innerHTML;
      if (/Cực kì thuyết phục/.test(x)) {
        document.body.innerHTML = document.body.innerHTML.replace(
          /Cực kì thuyết phục/g,
          " spamed"
        );
      }
      if (/cực kì thuyết phục/.test(x)) {
        document.body.innerHTML = document.body.innerHTML.replace(
          /cực kì thuyết phục/g,
          " spamed"
        );
      }
      if (/Cực kỳ thuyết phục/.test(x)) {
        document.body.innerHTML = document.body.innerHTML.replace(
          /Cực kỳ thuyết phục/g,
          " spamed"
        );
      }
      if (/cực kỳ thuyết phục/.test(x)) {
        document.body.innerHTML = document.body.innerHTML.replace(
          /cực kỳ thuyết phục/g,
          "spamed"
        );

        alert("Removed spam text!");
      }
       else alert("Ko tìm thấy cụm từ CKTP!");
    } else if (req.text) {
      document.body.innerHTML = document.body.innerHTML.replace(
        new RegExp(`${req.text}`, "g"),
        " spamed"
      );
      alert("Removed " + req.text);
    }
    sendResponse({
      data: "removed"
    });
  }
});
