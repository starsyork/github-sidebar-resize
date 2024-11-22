const widthSlider = document.getElementById('sidebar-width');
const widthDisplay = document.getElementById('current-width');
const saveButton = document.getElementById('save-button');

// Update the visible width when the slider changes
widthSlider.addEventListener('input', (e) => {
  widthDisplay.textContent = `${e.target.value}px`; // Update the live width value
});

// Send message to content script when "Save" is clicked
saveButton.addEventListener('click', () => {
  const selectedWidth = parseInt(widthSlider.value, 10);

  // Use chrome.tabs.query to get the active tab and send a message
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'RESIZE_SIDEBAR', width: selectedWidth }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message to content script:", chrome.runtime.lastError);
        } else {
          console.log("Response from content script:", response);
        }
      });
    }
  });

  // Optionally close the popup
  window.close();
});
