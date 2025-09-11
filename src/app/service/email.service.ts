import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  async sendWithEmailJS(formData: ContactFormData): Promise<any> {
    try {
      const emailjs = await import('@emailjs/browser');
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'ngovantrung204@gmail.com'
      };

      return emailjs.send(
        'service_c4lhnf9',    
        'template_hn6b40o',   
        templateParams,
        'niWws4GWF1fQ-qMqO'     
      );
    } catch (error) {
  console.error('Gửi email thất bại:', error);
  throw new Error('Không thể gửi email. Vui lòng thử lại sau.');
}
  }
}