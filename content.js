(function() {
    const sidebarSelector = '.file-navigation';  
    function applySidebarWidth(width) {
      const sidebar = document.querySelector(sidebarSelector);
      if (sidebar) {
        sidebar.style.maxWidth = 'none';
        sidebar.style.width = `${width}px`;
      }
    }
  
    chrome.storage.sync.get(['sidebarWidth'], (result) => {
      if (result.sidebarWidth) {
        applySidebarWidth(result.sidebarWidth);
      }
    });
  
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector(sidebarSelector);
      if (sidebar) {
        sidebar.addEventListener('mouseup', () => {
          const newWidth = sidebar.offsetWidth;
          chrome.storage.sync.set({ sidebarWidth: newWidth }, () => {
            console.log('Save width:', newWidth);
          });
        });
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  })();