export default {
  name: 'ls',
  description: 'list directories',
  execute: ls,
}


async function ls(directoryPath) {
  let text = await fetch('/js/filesystem')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const links = Array.from(doc.querySelectorAll('a'));
      return links.map(link => link.textContent).join('  ');
    });
    
  return text;
}
