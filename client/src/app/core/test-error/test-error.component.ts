import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl=environment.baseApiUrl;
  validationErrors:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404NotFound()
  {
    this.http.get(this.baseUrl + "buggy/notfound").subscribe({
      error:response=>{
        console.log(response);
      }
    });
  }

  get400BadRequest()
  {
    this.http.get(this.baseUrl + "buggy/badrequest").subscribe({
      error:response=>{
        console.log(response);
      }
    });
  }

  get400ValidationBadRequest()
  {
    this.http.get(this.baseUrl + "buggy/badrequest/One").subscribe({
      error:response=>{
        console.log(response);
        this.validationErrors=response.errors;
      }
    });
  }

  get500ServerError()
  {
    this.http.get(this.baseUrl + "buggy/servererror").subscribe({
      error:response=>{
        console.log(response);
      }
    });
  }

}
