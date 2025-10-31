// === your-script.js ===
// IXL Helper GUI + Answer Finder
(() => {
  if (window.ixlHelper) return;
  window.ixlHelper = true;

  // === GUI ===
  const gui = document.createElement('div');
  gui.innerHTML = `
    <div id="ixlHelperGui" style="position:fixed;top:20px;right:20px;width:300px;padding:15px;background:#0d0d1a;color:#0ff;border:3px solid #0ff;border-radius:12px;font-family:Arial,sans-serif;font-size:14px;box-shadow:0 0 25px #0ff;z-index:999999;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <b>IXL Helper</b>
        <span onclick="document.getElementById('ixlHelperGui').remove()" style="cursor:pointer;color:#f55;font-weight:bold;">X</span>
      </div>
      <button id="getAnswer" style="width:100%;padding:10px;background:#0f0;color:#000;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Get Answer</button>
      <div id="result" style="margin-top:10px;padding:10px;background:#111;border-radius:8px;min-height:40px;display:none;color:#0f0;"></div>
    </div>
  `;
  document.body.appendChild(gui);

  // === GET ANSWER ===
  document.getElementById('getAnswer').onclick = () => {
    const box = document.getElementById('result');
    box.style.display = 'block';
    box.innerHTML = '<i>Searching...</i>';

    let answer = null;

    // Try every known IXL answer location
    const checks = [
      () => document.querySelector('input[type="text"], input[type="number"]')?.value,
      () => document.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')?.parentElement?.innerText,
      () => [...document.querySelectorAll('span')].find(s => s.style.display === 'none' && s.innerText.trim())?.innerText.trim(),
      () => document.querySelector('.correct-answer, .answer-correct, .solution, .answer-key')?.innerText.trim(),
      () => document.querySelector('[data-correct]')?.innerText.trim()
    ];

    for (const check of checks) {
      try {
        const res = check();
        if (res && res.trim()) {
          answer = res.trim();
          break;
        }
      } catch (e) {}
    }

    setTimeout(() => {
      box.innerHTML = answer
        ? `<b style="color:#0f0;">Answer: ${answer}</b>`
        : `<span style="color:#f55;">No answer found.</span>`;
    }, 400);
  };
})();