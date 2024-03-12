import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatButtonComponent } from "./chat-button/chat-button.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ChatButtonComponent]
})
export class AppComponent {
  title = 'Task1';
}
