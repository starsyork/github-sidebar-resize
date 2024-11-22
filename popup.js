// popup.js

// Grab references to the UI components
const widthSlider = document.getElementById('sidebar-width');
const widthDisplay = document.getElementById('current-width');
const saveButton = document.getElementById('save-button');

// Update the visible width value when the slider changes
widthSlider.addEventListener('input', (e) => {
  widthDisplay.textContent = `${e.target.value}px`;
});

// Save the selected width and send it to the content script
saveButton.addEventListener('click', () => {
  const selectedWidth = parseInt(widthSlider.value, 10);

  // Send a message to the content script with the new width
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'RESIZE_SIDEBAR', width: selectedWidth });
  });

  // Optionally, close the popup after saving
  window.close();
});
