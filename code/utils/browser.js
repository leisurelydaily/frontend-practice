const browser = (function() {
  let copyToClip = str => {
    let el = document.createElement("textarea");
    el.value = str;
    el.style.position="fixed";
    el.style.left="-9999px";
    // el.style.display = "none";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    console.log("copy text:",el.value);
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };
  return {
    copyToClip
  };
})();



export { browser };
