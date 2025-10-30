// ==== your-script.js ====
// This is the payload that the bookmarklet will download & eval

console.log("%cMy IXL test script loaded!", "color:lime;font-size:16px");

// Example: highlight every question
document.querySelectorAll('.question, .problem').forEach(el => {
  el.style.outline = "3px solid gold";
  console.log("Question text:", el.innerText.trim());
});

// Add whatever you want to test here
// e.g. auto-click correct answers, log scores, etc.