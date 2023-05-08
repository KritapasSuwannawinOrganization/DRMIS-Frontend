export default function pathToUrl(path) {
  return process.env.REACT_APP_STORAGE_URL + path.replaceAll('/', '%2F') + '?alt=media';
}
