// A simple function to shorten text from lastFm

export function trimNonsenseText(info) {
  let deleteFromHere = info.search("<a", 0);
  return info.substring(0, deleteFromHere);
}
