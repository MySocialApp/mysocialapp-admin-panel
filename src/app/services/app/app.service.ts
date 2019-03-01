import {Injectable} from '@angular/core';
import {Session} from 'mysocialapp-ts-client/lib/session';
import {MySocialApp} from 'mysocialapp-ts-client';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {AppConfig} from 'mysocialapp-ts-client/lib/models/app_config';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

const tokenKey = 'msatoken';
const configKey = 'msaconfig';
const accountkey = 'msaaccount';

@Injectable()
export class AppService {

    private session: Session;
    private account: Account;
    private msa: MySocialApp;
    private conf: AppConfig;

    constructor(private router: Router,
                private title: Title) {
    }

    static isLogged(): boolean {
        const t = localStorage.getItem(tokenKey);
        return t != null && t !== '';
    }

    async getConfig(): Promise<AppConfig> {
      const c = this.getConfigOrNull();
      if (c != null) {
        return c;
      }
      this.conf = await this.getClient().getConfig();
      sessionStorage.setItem(configKey, JSON.stringify(this.conf));
      return this.conf;
    }

    getConfigOrNull(): AppConfig {
      if (this.conf !== undefined) {
        return this.conf;
      }
      const str = sessionStorage.getItem(configKey);
      if (str != null && str !== '') {
        this.conf = JSON.parse(str);
        return this.conf;
      }
      return null;
    }

    async init() {
        this.conf = await this.getConfig();
        this.title.setTitle(this.conf.short_name + ' - Moderator dashboard')
        this.getSession();
        if (AppService.isLogged()) {
            await this.getAccount();
            // this.getNotification();
        }
    }

    async getNotification() {
        while (true) {
            if (!AppService.isLogged()) {
                return;
            }
            const notifications = await this.getSession().notification.list(0, 5);
            if (notifications.length > 0) {
                const notifs = [];
                for (const notification of notifications) {
                    let t = notification.last_notification.owner.first_name.substr(1);
                    if (notification.last_notification.owner.last_name) {
                        t += notification.last_notification.owner.last_name.substr(1);
                    }
                    notifs.push({
                        avatarText: t,
                        from: t,
                        text: notification.last_notification.title,
                        date: notification.last_notification.created_date,
                    });
                }
                // TODO manage notification
                // this.ui.updateLayout({notifications: notifs});
            }
            await this.sleep(30000);
        }
    }

    async sleep(duration: number): Promise<{}> {
        return new Promise(((resolve) => {
            setTimeout(resolve, duration);
        }));
    }

    getClient(): MySocialApp {
        if (this.msa === undefined) {
            this.msa = new MySocialApp().setAppId(environment.appId);
        }
        return this.msa;
    }

    disconnect() {
        this.msa = undefined;
        this.session = undefined;
        sessionStorage.clear();
        localStorage.clear();
        this.getSession();
    }

    getSession(): Session {
        if (this.session === undefined) {
            this.getClient();
            if (AppService.isLogged()) {
                this.session = this.getClient().connectWithToken(localStorage.getItem(tokenKey));
            } else {
                this.session = this.getClient().createSession();
            }
        }
        return this.session;
    }

    async login(email: string, password: string, store: boolean = true): Promise<Session> {
        const session = await this.getClient().connect(email, password);
        localStorage.setItem(tokenKey, session.auth.access_token);
        this.session = session;
        await this.getAccount();
        // this.getNotification();
        return session;
    }

    async getAccount(): Promise<Account> {
      if (this.account != null) {
        return this.account;
      } else {
        const str = sessionStorage.getItem(accountkey);
        if (str != null && str !== '') {
          return this.account = JSON.parse(str);
        }
        return this.session.account.get().then(account => {
          if (!account.authorities.some( (item) => item === 'ROLE_ADMIN' || item === 'ROLE_MODERATOR')) {
            localStorage.setItem(tokenKey, '');
            this.router.navigate(['auth', 'login'], {
              queryParams: {'error': 'authority'}
            });
            return null;
          }
          this.account = account;
          sessionStorage.setItem(accountkey, JSON.stringify(this.account));
          return this.account;
        }, error => {
          return null;
        });
      }
    }
}
