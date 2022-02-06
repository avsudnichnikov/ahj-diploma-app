import transformLinks from "@utls/transformLinks";

export default class Organizer {
  constructor(el, url, user) {
    this.el = el;
    this.url = url;
    this.user = user;

    this.messageEl = this.el.querySelector('#messages-tile');
    this.sendBtn = this.el.querySelector('#send-btn');
    this.sendInp = this.el.querySelector('#send-inp');

    this.user.afterAuth = () => this.start();
  }

  init() {
    this.ws = null;

    this.sendBtn.addEventListener('click', (evt) => this.sendHandler(evt));
    this.sendInp.addEventListener('keypress', (evt) => {
      if (evt.code === 'Enter') {
        this.sendHandler(evt)
      }
    });
  }

  start() {
    this.ws = new WebSocket(this.url, this.user.token);
    this.ws.addEventListener('open', (evt) => this.wsOpenHandler(evt));
    this.ws.addEventListener('message', (evt) => {
      const {event, data} = JSON.parse(evt.data);
      switch (event) {
        case 'message':
          this.wsMessageHandler(data);
          break;
        default:
          console.log(evt);
      }
    });
    this.ws.addEventListener('close', (evt) => this.wsCloseHandler(evt));
    this.el.classList.add('is-active');
  }

  wsSend(text) {
    if (text) {
      this.ws.send(JSON.stringify({data: {text}}));
    }
  }

  wsOpenHandler() {
    this.wsSend('Hello, there!');
  }

  wsMessageHandler(data) {
    this.renderNotification(data.message, data.date);
  }

  wsCloseHandler() {
    console.log('connection closed');
    this.init();
  }

  sendHandler(evt) {
    evt.preventDefault();
    this.wsSend(this.sendInp.value);
    this.sendInp.value = '';
  }

  renderNotification(message) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message-wrapper');
    messageEl.innerHTML = `
    <div class="message">
      <div class="date">${(new Date(message.date)).toLocaleString()}</div>
      <div class="text">${transformLinks(message.text)}</div> 
    </div>`;
    this.messageEl.append(messageEl);
  }
}
