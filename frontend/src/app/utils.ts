import path from "path";

function reloadIframe(element: HTMLIFrameElement) {
  element.contentWindow?.location.reload();
}

function getBackendApiUrl(apiPath: string | undefined) {
  if (
    !process.env.BACKEND_URL ||
    !process.env.BACKEND_API_BASE_PATH ||
    !apiPath
  )
    throw "Configuration of API missing";

  const url = new URL(
    path.join(
      process.env.BACKEND_URL,
      process.env.BACKEND_API_BASE_PATH,
      apiPath
    )
  );
  url.searchParams.append("format", "json");
  return url;
}
export { reloadIframe, getBackendApiUrl };
