import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Bienvenido a DoctorApp';

  users: any; // ! Cambiar

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5016/api/User').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request Complete')
    });
  }

}
