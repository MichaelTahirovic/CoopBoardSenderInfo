// When the popup opens, scrape the page by class names instead of the table
document.addEventListener('DOMContentLoaded', () => {
    const infoContainer = document.getElementById('infoContainer');
    const copyBtn = document.getElementById('copyBtn');
    let orgData = {};
  
    // 1. Inject a script into the active tab to grab all .np-view-question--# elements
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // list out all the class suffixes we care about
          const classNums = [3, 4, 5, 6, 9, 10, 12, 13, 14, 15];
          const data = {};
  
          classNums.forEach(n => {
            // grab the container for this question
            const container = document.querySelector(`.np-view-question--${n}`);
            if (!container) return;
  
            // you might need to adjust these two queries to match your markup:
            //    - `.question-label` → selector for the field name text
            //    - `.question-answer` → selector for the field value text
            const labelEl = container.querySelector('.question-label') 
                          || container.querySelector('label') 
                          || container;
            const valueEl = container.querySelector('.question-answer') 
                          || container.querySelector('.answer') 
                          || container.nextElementSibling 
                          || container;
  
            const key = labelEl.innerText.trim();
            const val = valueEl.innerText.trim();
            data[key] = val;
          });
  
          return data;
        }
      }, (results) => {
        const result = results[0].result;
        if (!result || Object.keys(result).length === 0) {
          infoContainer.innerText = 'No organization info found.';
          copyBtn.disabled = true;
          return;
        }
        orgData = result;
  
        // render into our popup
        infoContainer.innerHTML = '';
        Object.entries(orgData).forEach(([k, v]) => {
          const div = document.createElement('div');
          div.className = 'field';
          div.textContent = `${k}: ${v}`;
          infoContainer.appendChild(div);
        });
      });
    });
  
    // 2. Copy as cover-letter TO: header when button clicked
    copyBtn.addEventListener('click', () => {
      // Customize this template to change formatting!
      let text = '';
      text += `To: ${orgData['Organization Name'] || ''}\n`;
      text += `${orgData['Address'] || ''}\n`;
      text += `${orgData['City, Province/State, Postal Code'] || ''}\n\n`;
      text += `Re: ${orgData['Job Title'] || ''} (${orgData['Job ID'] || ''})\n`;
  
      navigator.clipboard.writeText(text)
        .then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 1500);
        })
        .catch(() => {
          copyBtn.textContent = 'Error';
        });
    });
  });