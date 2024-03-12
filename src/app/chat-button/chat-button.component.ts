import { Component } from '@angular/core';
import { ChatService } from './chat-button.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.css']
})
export class ChatButtonComponent {

  isChatOpen: boolean = false;
  newMessage: string = '';
  chatMessages: Message[] = []; // Mảng lưu trữ các tin nhắn
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = false;
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const userMessage: Message = { sender: 'user', content: this.newMessage };
      this.chatMessages.push(userMessage);
      this.newMessage = '';

      this.chatService.sendMessage(userMessage.content).subscribe(response => {
        const gptMessageContent = response.choices[0]?.message?.content;
        if (gptMessageContent) {
          const gptMessage: Message = { sender: 'gpt', content: gptMessageContent.trim() };
          this.chatMessages.push(gptMessage);
        } else {
          console.error('Invalid response from ChatGPT:', response);
        }
      });
    }
  }


  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
