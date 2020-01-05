import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ScriptService {

    loadScripts = [];

    loadScript(url: string) {
        return new Observable(subscriber => {
            // resolve if already loaded
            if (this.loadScripts.includes(url)) {
                subscriber.next();
                subscriber.complete();
            } else {
                // load script
                const script: HTMLScriptElement = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                if ((<any> script).readyState) {  // IE
                    (<any> script).onreadystatechange = () => {
                        if ((<any> script).readyState === 'loaded' || (<any> script).readyState === 'complete') {
                            (<any> script).onreadystatechange = null;
                            this.loadScripts.push(url);
                            subscriber.next();
                            subscriber.complete();
                        }
                    };
                } else {  // Others
                    script.onload = () => {
                        this.loadScripts.push(url);
                        subscriber.next();
                        subscriber.complete();
                    };
                }
                script.onerror = (error: any) => subscriber.error(error);
                document.body.appendChild(script);
            }
        });
    }

}
