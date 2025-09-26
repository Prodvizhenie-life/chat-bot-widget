(function() {
  // Кнопка вызова
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Открыть чат-бот');
  btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#3C50E2"/><text x="16" y="21" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial" font-weight="bold">Ч</text></svg>';
  btn.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #3C50E2;
    color: #FFF;
    border: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    cursor: pointer;
    font-size: 32px;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  `;
  btn.onmouseover = () => btn.style.background = '#2536a5';
  btn.onmouseout = () => btn.style.background = '#3C50E2';

  // Кнопка закрытия
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Закрыть чат-бот');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    display: none;
    position: fixed;
    width: 44px;
    height: 44px;
    background: #fff;
    color: #3C50E2;
    border: none;
    border-radius: 50%;
    font-size: 32px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(60,80,226,0.12);
    cursor: pointer;
    z-index: 2147483100;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, top 0.2s, right 0.2s;
    text-align: center;
    line-height: 44px;
    touch-action: manipulation;
  `;
  closeBtn.onmouseover = () => closeBtn.style.background = '#F9F9F9';
  closeBtn.onmouseout = () => closeBtn.style.background = '#FFF';

  // Адаптивные размеры виджета
  function getWidgetSize() {
    const isMobile = window.innerWidth <= 600;
    return isMobile
      ? { width: '100vw', height: '100vh', right: 0, bottom: 0, borderRadius: 0, isMobile: true }
      : { width: 400, height: 600, right: 20, bottom: 90, borderRadius: 18, isMobile: false };
  }

  // Расположение closeBtn
  function positionCloseBtn(size, visible) {
    if (!visible) {
      closeBtn.style.display = 'none';
      return;
    }
    closeBtn.style.display = 'flex';
    if (size.isMobile) {
      closeBtn.style.right = '12px';
      closeBtn.style.top = '12px';
    } else {
      closeBtn.style.right = (size.right + 12) + 'px';
      closeBtn.style.top = `calc(100vh - ${size.bottom + size.height}px + 12px)`;
    }
  }

  // Айфрейм
  const iframe = document.createElement('iframe');
  iframe.src = 'https://docs.crm-tg-mini-app.tw1.ru'; // <-- замени на свой адрес!

  // Состояние для анимаций
  let animating = false;
  function setIframeStyle(visible = false) {
    const size = getWidgetSize();
    iframe.style.position = 'fixed';
    iframe.style.right = size.right + 'px';
    iframe.style.bottom = size.bottom + 'px';
    iframe.style.width = typeof size.width === 'number' ? size.width + 'px' : size.width;
    iframe.style.height = typeof size.height === 'number' ? size.height + 'px' : size.height;
    iframe.style.border = 'none';
    iframe.style.borderRadius = typeof size.borderRadius === 'number' ? size.borderRadius + 'px' : size.borderRadius;
    iframe.style.background = '#FFF';
    iframe.style.boxShadow = '0 4px 32px rgba(60,80,226,0.12), 0 1.5px 7.5px #3C50E2';
    iframe.style.zIndex = '2147483000';
    iframe.style.maxWidth = '100vw';
    iframe.style.maxHeight = '100vh';
    iframe.style.transition = 'opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)';
    iframe.style.display = 'block';
    if (visible) {
      iframe.style.opacity = '1';
      iframe.style.pointerEvents = 'auto';
      iframe.style.transform = 'scale(1)';
    } else {
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.style.transform = 'scale(0.97)';
    }
    positionCloseBtn(size, visible);
  }
  setIframeStyle(false);

  window.addEventListener('resize', () => setIframeStyle(iframe.style.opacity === '1'));

  // Открытие виджета с анимацией
  btn.onclick = function() {
    setIframeStyle(true);
    btn.style.display = 'none';
  };

  // Закрытие по крестику
  closeBtn.onclick = function() {
    animating = true;
    setIframeStyle(false);
    setTimeout(() => {
      animating = false;
      btn.style.display = 'flex';
    }, 400);
  };

  // Закрытие по postMessage (если нужно закрывать из iframe)
  window.addEventListener('message', (event) => {
    if (event.data === 'close-widget') {
      animating = true;
      setIframeStyle(false);
      setTimeout(() => {
        animating = false;
        btn.style.display = 'flex';
      }, 400);
    }
  });

  // Вставка элементов
  document.body.appendChild(btn);
  document.body.appendChild(iframe);
  document.body.appendChild(closeBtn);
})();
