import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userInput: string = '';
  messages: { sender: string, text: string }[] = [];
  loading = false;
  charCount: number = 0;
  isOpen: boolean = false;

  // Predefined AI buttons
  preMessages = [
    { label: "Luise's Strengths", content: "Tell me about Luise's strengths." },
    { label: "Luise's Work History", content: "Tell me about Luise's work history." },
    { label: "Luise's Tech Stack", content: "Tell me about Luise's tech stack." }
  ];

  constructor(private chatService: ChatService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  updateCharCount() {
    this.charCount = this.userInput.length;
  }

  // Send message from input
  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ sender: 'user', text: userMessage });
    this.userInput = '';
    this.charCount = 0;
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

  // Send message from pre-defined button
  sendPreMessage(content: string) {
    this.messages.push({ sender: 'user', text: content });
    this.loading = true;

    this.chatService.sendMessage(content).subscribe({
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
