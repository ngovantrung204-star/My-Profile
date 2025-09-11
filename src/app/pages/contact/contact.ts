import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  emailCopied = false;
  sdtCopied = false;
  diachiCopied = false;
  copiedMessage: string = '';
  isSubmitting = false;
  submitStatus: 'none' | 'success' | 'error' = 'none';
  errorMessage = '';

  contactInfo = {
    email: 'ngovantrung204@gmail.com',
    sdt: '0583532371',
    diachi: '70 Lạc Long Quân - thôn Tiến An - phường Tiến Thành - tỉnh Lâm Đồng'
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private emailService: EmailService,
  ) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  copyEmail() {
    const email = this.contactInfo.email;
    navigator.clipboard.writeText(email).then(() => {
      this.emailCopied = true;
      this.showCopiedMessage('📧 Email đã được copy thành công!');
      localStorage.setItem('savedEmail', email);
      setTimeout(() => {
        this.emailCopied = false;
      }, 2000);
    }).catch(err => {
      console.error('Không thể copy email:', err);
      this.showCopiedMessage('❌ Lỗi khi copy email!');
    });
  }

  copySdt() {
    const sdt = this.contactInfo.sdt;
    navigator.clipboard.writeText(sdt).then(() => {
      this.sdtCopied = true;
      this.showCopiedMessage('📱 Số điện thoại đã được copy!');

      localStorage.setItem('savedPhone', sdt);
      setTimeout(() => {
        this.sdtCopied = false;
      }, 2000);
    }).catch(err => {
      console.error('Không thể copy số điện thoại:', err);
      this.showCopiedMessage('❌ Lỗi khi copy số điện thoại!');
    });
  }

  copyDiachi() {
    const diachi = this.contactInfo.diachi;
    navigator.clipboard.writeText(diachi).then(() => {
      this.diachiCopied = true;
      this.showCopiedMessage('📍 Địa chỉ đã được copy!');

      localStorage.setItem('savedAddress', diachi);

      setTimeout(() => {
        this.diachiCopied = false;
      }, 2000);
    }).catch(err => {
      console.error('Không thể copy địa chỉ:', err);
      this.showCopiedMessage('❌ Lỗi khi copy địa chỉ!');
    });
  }

  // Tự động điền thông tin từ localStorage



  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitStatus = 'none';
      const formData = this.contactForm.value;
      this.sendWithEmailJS(formData);
    } else {
      this.markFormGroupTouched();
      this.showCopiedMessage('❌ Vui lòng điền đầy đủ thông tin!');
    }
  }

  private async sendWithEmailJS(formData: any) {
    try {
      const response = await this.emailService.sendWithEmailJS(formData);
      console.log('✅ Email sent successfully!', response);
      this.handleSubmitSuccess();
    } catch (error) {
      console.error('❌ Email send failed:', error);
      this.handleSubmitError('Không thể gửi email qua EmailJS. Vui lòng kiểm tra cấu hình!');
    }
  }


  private handleSubmitSuccess() {
    this.isSubmitting = false;
    this.submitStatus = 'success';
    this.showCopiedMessage('🎉 Tin nhắn đã được gửi thành công!')
    this.contactForm.reset();
    setTimeout(() => {
      this.submitStatus = 'none';
    }, 5000);
  }

  // Xử lý lỗi
  private handleSubmitError(message: string) {
    this.isSubmitting = false;
    this.submitStatus = 'error';
    this.errorMessage = message;
    this.showCopiedMessage('❌ Gửi tin nhắn thất bại!');


    setTimeout(() => {
      this.submitStatus = 'none';
      this.errorMessage = '';
    }, 5000);
  }


  showCopiedMessage(message: string) {
    this.copiedMessage = message;
    setTimeout(() => {
      this.copiedMessage = '';
    }, 3000); // 3 giây
  }


  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }


  get f() {
    return this.contactForm.controls;
  }


  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.contactForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }

    return field.invalid && (field.dirty || field.touched);
  }
}