// === your-script.js ===
// IXL Helper GUI + Answer Finder
(() => {
  if (window.guiLoaded) return;
  window.guiLoaded = true;

  const gui = document.createElement('div');
  gui.innerHTML = `
    <div style="position:fixed;top:20px;right:20px;width:300px;padding:15px;background:#0a0a1a;color:#0ff;border:3px solid #0ff;border-radius:12px;font-family:Arial,sans-serif;font-size:14px;box-shadow:0 0 20px #0ff;z-index:999999;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <b>IXL Helper</b>
        <span onclick="this.parentElement.parentElement.parentElement.remove()" style="cursor:pointer;color:#f55;font-weight:bold;">X</span>
      </div>
      <button id="getBtn" style="width:100%;padding:10px;background:#0f0;color:#000;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Get Answer</button>
      <div id="ansBox" style="margin-top:10px;padding:10px;background:#111;border-radius:8px;min-height:40px;display:none;color:#0f0;"></div>
    </div>
  `;
  document.body.appendChild(gui);

  document.getElementById('getBtn').onclick = () => {
    const box = document.getElementById('ansBox');
    box.style.display = 'block';
    box.innerHTML = '<i>Searching...</i>';

    let answer = null;

    // Try all known IXL answer locations
    const tries = [
      () => document.querySelector('.correct-answer, .answer-correct, [data-correct]')?.innerText,
      () => document.querySelector('input[type="text"], input[type="number"]')?.value,
      () => document.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')?.parentElement?.innerText,
      () => [...document.querySelectorAll('span')].find(s => s.style.display === 'none' && s.innerText.match(/\d|true|false/))?.innerText,
      () => document.querySelector('.solution, .answer-key')?.innerText
    ];

    for (const t of tries) {
      try { const res = t(); if (res && res.trim()) { answer = res.trim(); break; } } catch(e) {}
    }

    setTimeout(() => {
      box.innerHTML = answer 
        ? `<b style="color:#0f0;">Answer: ${answer}</b>` 
        : `<span style="color:#f55;">Not found. Try another question.</span>`;
    }, 400);
  };
})();