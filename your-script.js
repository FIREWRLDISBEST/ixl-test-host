// === your-script.js ===
// GUI + Answer Finder for IXL

(function() {
  // Avoid running twice
  if (window.ixlGuiLoaded) return;
  window.ixlGuiLoaded = true;

  // === CREATE FLOATING GUI ===
  const gui = document.createElement('div');
  gui.innerHTML = `
    <div style="
      position: fixed;
      top: 20px; right: 20px;
      width: 300px; padding: 15px;
      background: #1a1a2e; color: #0ff;
      border: 2px solid #0ff; border-radius: 12px;
      font-family: Arial, sans-serif; font-size: 14px;
      box-shadow: 0 0 20px rgba(0,255,255,0.5);
      z-index: 999999; user-select: none;
    ">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <b>IXL Helper</b>
        <span onclick="this.parentElement.parentElement.parentElement.remove()" 
              style="cursor:pointer; color:#f55;">✕</span>
      </div>
      <button id="getAnswerBtn" style="
        width:100%; padding:10px; background:#0f0; color:#000;
        border:none; border-radius:8px; font-weight:bold; cursor:pointer;
      ">Get Answer</button>
      <div id="answerBox" style="
        margin-top:10px; padding:10px; background:#16213e;
        border-radius:8px; min-height:40px; display:none;
      "></div>
    </div>
  `;
  document.body.appendChild(gui);

  // === GET ANSWER BUTTON ===
  document.getElementById('getAnswerBtn').onclick = () => {
    const answerBox = document.getElementById('answerBox');
    answerBox.style.display = 'block';
    answerBox.innerHTML = '<i>Finding answer...</i>';

    // === AUTO-FIND ANSWER (works on most IXL math) ===
    let answer = null;

    // Method 1: Look for highlighted correct answer
    const correct = document.querySelector('.correct-answer, .answer-correct, [data-correct="true"]');
    if (correct) {
      answer = correct.innerText.trim();
    }

    // Method 2: Look in hidden answer span (common in IXL)
    if (!answer) {
      const hidden = document.querySelector('span[style*="display:none"], .answer-key, .solution');
      if (hidden) answer = hidden.innerText.trim();
    }

    // Method 3: Look for input with value
    if (!answer) {
      const input = document.querySelector('input[type="text"], input[type="number"]');
      if (input && input.value) answer = input.value;
    }

    // Method 4: Multiple choice - find checked or correct
    if (!answer) {
      const checked = document.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked');
      if (checked) {
        answer = checked.parentElement.innerText.trim();
      }
    }

    // === SHOW RESULT ===
    setTimeout(() => {
      if (answer && answer !== '') {
        answerBox.innerHTML = `<b style="color:#0f0;">Answer: ${answer}</b>`;
      } else {
        answerBox.innerHTML = `<span style="color:#f55;">No answer found. Try another question.</span>`;
      }
    }, 300);
  };

  console.log("%cIXL Helper GUI Loaded!", "color:cyan;font-size:16px");
})();