import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
  })
  
export class NotificationService {
  private messageService = inject(MessageService)

  showSuccess(summary: string = 'Saved successfully', detail: string = 'Your changes have been saved.') {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail
    });
  }

  showError(summary: string = 'Error', detail: string = 'Something went wrong.') {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }
}
