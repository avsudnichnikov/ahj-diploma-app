export default function transformLinks(text) {
  const linkRegex =
    /((http(s)?:\/\/)|(www\.))[?\wа-я@:%.\+~#=]+(\.[a-zа-я]{2,6})?(:\d+)?\b([-a-z0-9@:%_\+.~#?&//=]*[a-z\d\/])/ig;
  return text.replace(linkRegex, (m) =>
    `<a href="${(m.includes('http')) ? m : 'https://' + m}" target="_blank">${m}</a>`
  );
}
