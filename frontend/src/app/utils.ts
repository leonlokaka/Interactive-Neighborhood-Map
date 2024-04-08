
function reloadIframe(element: HTMLIFrameElement){
  element.contentWindow?.location.reload();
}

export { reloadIframe };
