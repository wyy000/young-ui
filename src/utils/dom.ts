/**
 * @param handler {function}
 * @returns {function(): void}
 */
export function onClickaway (handler: Function) {
  function onClick ({target}: MouseEvent) {
    let current = target as HTMLElement
    do {
      if (current.hasAttribute('data-prevent-clickaway')) return
      else if (current.hasAttribute('data-trigger-clickaway')) return handler()
      current = current.parentElement!
    } while (current)
    handler()
  }

  document.addEventListener('click', onClick, true)

  return function stop () {
    document.removeEventListener('click', onClick, true)
  }
}

export function useClickaway (handler: Function) {
  return {
    stop: onClickaway(handler),
  }
}

export function useClipboard (navigator: Navigator = window.navigator) {
  const isSupported = navigator && 'clipboard' in navigator
  const copy = async (text: string) => await navigator.clipboard.writeText(text)

  return {
    isSupported,
    copy,
  }
}
