import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AuthModule } from './auth/auth.module'
import { AppRoutingModule } from "./app-routing.module";
import { ErrorComponent } from "./error/error.component";
import { PostsModule } from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PostsModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
