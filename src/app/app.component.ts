import { ChangeDetectorRef, Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  darkMode: boolean
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ref:ChangeDetectorRef
  ) {
    Plugins.DarkMode.addListener("darkModeStateChanged", (state: any) => {
      if(state.isDarkModeOn)
      {
      this.darkMode = true
      this.ref.detectChanges()
      }
      else
      {
      this.darkMode = false
      this.ref.detectChanges()
      
      }
      if(state.supported == false)
      {
      console.log("dark mode is not supported")
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
