import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
userInput: string = '';
messages: { sender: string, text: string }[] = [];
loading = false;

// NEW: control chat window open/close
isOpen = false;

constructor(private chatService: ChatService) {}

// NEW: toggle chat window
toggleChat() {
  this.isOpen = !this.isOpen;
}

sendMessage() {
  if (!this.userInput.trim()) return;

  const userMessage = this.userInput;

  this.messages.push({ sender: 'user', text: userMessage });
  this.userInput = '';
  this.loading = true;

  this.chatService.sendMessage(userMessage).subscribe({
    next: (res) => {
      const reply = res.choices[0].message.content;
      this.messages.push({ sender: 'bot', text: reply });
      this.loading = false;
    },
    error: () => {
      this.messages.push({ sender: 'bot', text: 'Error connecting to server.' });
      this.loading = false;
    }
  });
}
}
