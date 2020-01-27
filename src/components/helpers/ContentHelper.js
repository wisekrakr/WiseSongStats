// Check if content is available, if not, return NO DATA AVAILABLE

export function checkForContent(content) {
  if (content === undefined || content === "") {
    return "NO DATA AVAILABLE";
  } else {
    return content;
  }
}
