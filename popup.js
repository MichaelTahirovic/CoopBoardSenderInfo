// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const infoContainer = document.getElementById('infoContainer');
    const copyBtn       = document.getElementById('copyBtn');
  
    // the only state we need
    let orgData = {};      // for lookup by label
    let orgList = [];      // ordered [{key,val},…]
  
    // 1) pull from page
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const classNums = [3,4,5,6,9,10,12,13,14,15];
          const out = [];
  
          classNums.forEach(n => {
            const container = document.querySelector(`.np-view-question--${n}`);
            if (!container) return;
  
            const row = container.closest('tr');
            if (!row) return;
  
            const cells = row.querySelectorAll('td');
            if (cells.length < 2) return;
  
            out.push({
              key: cells[0].innerText.trim(),
              val: cells[1].innerText.trim()
            });
          });
  
          return out;
        }
      }, results => {
        const dataList = results[0].result || [];
        if (!dataList.length) {
          infoContainer.innerText = 'No organization info found.';
          copyBtn.disabled = true;
          return;
        }
  
        // store both list & lookup object
        orgList = dataList;
        orgData = {};
        dataList.forEach(({key,val}) => { orgData[key] = val; });
  
        // render in-pupup, in order
        infoContainer.innerHTML = '';
        orgList.forEach(({key,val}) => {
          const div = document.createElement('div');
          div.className = 'field';
          div.textContent = `${key} ${val}`;   // no extra colon
          infoContainer.appendChild(div);
        });
  
        // now that orgData exists, enable & wire up Copy
        copyBtn.disabled = false;
        copyBtn.addEventListener('click', () => {
          // ** Customize this TO: template as needed **
          /*FirstName LastName
            Contact Title
            Address
            City, Province PostalCode

            Dear Salutation LastName, */
          let text = '';
          text += `${orgData['Job Contact First Name:'] || ''} ${orgData['Job Contact Last Name:'] || ''}\n`;
          text += `${orgData['Contact Title:'] || ''}\n`;
          text += `${orgData['Address Line One:'] || ''}\n`;
          text += `${orgData['City:'] || ''}, ${orgData['Province / State:'] || ''} ${orgData['Postal Code / Zip Code:'] || ''}\n\n`;
          text += `Dear ${orgData['Salutation:'] || ['Job Contact First Name:'] || ''} ${orgData['Job Contact Last Name:'] || ''},\n\n`;
  
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
    });
  });
  