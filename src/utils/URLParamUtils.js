export function get(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function set(param, value) {
  // Get current URL
  const currentURL = new URL(window.location.href);

  // Set param
  const currentURLParams = new URLSearchParams(currentURL.search);
  currentURLParams.set(param, value);
  currentURL.search = currentURLParams.toString();

  // Write new URL to history
  history.replaceState(null, "", currentURL.href);
}
