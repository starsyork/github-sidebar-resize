(function () {
    const sidebarSelector = '.file-navigation'; // Sidebar selector
  
    // Apply a new width to the sidebar
    function applyNewWidth(width) {
      const sidebar = document.querySelector(sidebarSelector);
      if (sidebar) {
        sidebar.style.width = `${width}px`;
        sidebar.style.maxWidth = 'none';
      }
    }
  
    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'RESIZE_SIDEBAR') {
        const newWidth = message.width;
  
        // Apply the new width
        applyNewWidth(newWidth);
  
        // Save the new width to storage (optional for persistence)
        chrome.storage.sync.set({ sidebarWidth: newWidth }, () => {
          console.log('Sidebar width saved:', newWidth);
        });
      }
    });
  
    // Load saved width on page load
    document.addEventListener('DOMContentLoaded', () => {
      chrome.storage.sync.get(['sidebarWidth'], (result) => {
        if (result.sidebarWidth) {
          applyNewWidth(result.sidebarWidth);
        }
      });
    });
  })();
  