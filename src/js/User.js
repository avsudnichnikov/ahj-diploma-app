import RestSource from './RestSource';

export default class User {
  constructor(el, url) {
    this.el = el;
    this.url = url;

    this.afterAuth = (f) => f;

    this.btn = this.el.querySelector('#join-btn');
    this.btn.addEventListener('click', () => this.auth());
  }

  auth() {
    const helper = this.el.querySelector('#join-helper');
    const password = this.el.querySelector('#join-password').value;
    const username = this.el.querySelector('#join-username').value;

    const handler = (resp) => {
      if (resp.code === 'success') {
        this.username = resp.data.username;
        this.token = resp.data.token;

        helper.innerText = '';
        this.el.classList.remove('is-active');
        console.log(`Join as ${this.username}`);

        this.afterAuth();
      } else {
        helper.innerText = resp.errors.username;
      }
    };

    const userSource = new RestSource(this.url + 'auth/');
    userSource.post({ username, password }, handler);
  }
}
