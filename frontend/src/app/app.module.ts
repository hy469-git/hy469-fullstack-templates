import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';
import { SmartSpeakerService } from './smart-speaker.service'

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        ItemShopComponent,
        ItemPreviewComponent
    ],
    imports: [
        SocketIoModule.forRoot(socketIoConfig),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        SmartSpeakerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
