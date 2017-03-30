import { AppModule } from "./modules/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
