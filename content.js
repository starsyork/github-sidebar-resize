(function () {
    const sidebarSelector = '.file-navigation'; // Sidebar CSS selector
  
    // Function to apply a new width to the sidebar
    function applyNewWidth(width) {
      const sidebar = document.querySelector(sidebarSelector);
      if (sidebar) {
        sidebar.style.width = `${width}px`; // Set the new width
        sidebar.style.maxWidth = 'none'; // Remove width limitations
        console.log(`Sidebar width set to ${width}px.`);
      } else {
        console.warn('Sidebar element not found!');
      }
    }
  
    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'RESIZE_SIDEBAR') {
        const { width } = message;
  
        // Apply the new width and respond back to the popup
        applyNewWidth(width);
  
        // Store the sidebar width persistently
        chrome.storage.sync.set({ sidebarWidth: width }, () => {
          console.log(`Saved sidebar width: ${width}px.`);
        });
  
        sendResponse({ status: 'success', widthSet: width });
      }
    });
  
    // Load and apply the saved sidebar width when the page loads
    document.addEventListener('DOMContentLoaded', () => {
      chrome.storage.sync.get(['sidebarWidth'], (result) => {
        if (result.sidebarWidth) {
          applyNewWidth(result.sidebarWidth);
        }
      });
    });
  })();
