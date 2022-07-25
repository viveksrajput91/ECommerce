import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors:string[];

  constructor(private formBuilder : FormBuilder,private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registerForm= this.formBuilder.group({
      displayName:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\.)+[\\w-]{2,4}$')],
            [this.validateEmailExistAsync()]],
      password:[null,[Validators.required]]
    });
  }

  onSubmit()
  {
    this.accountService.register(this.registerForm.value).subscribe({
      next:()=>console.log(this.registerForm.valid),
      error:(error:any)=>
      {
        console.log(error);
        this.errors=error.errors;
      }
    });
  }

  validateEmailExistAsync(): AsyncValidatorFn
  {
    return (control) =>{
     return timer(500).pipe(
      switchMap(()=>
      {
        if(!control.value)
        {
          return of(null);
        }

        return this.accountService.emailExist(control.value).pipe(
          map(res=>{
            return res ? {emailExists:true}:null;
          })
        );

      })
     );
    }
  }
}

