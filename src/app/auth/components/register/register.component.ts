import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {registerAction} from 'src/app/auth/store/actions/register.actions'
import {isSubmittingSelector, validationErrorsSelector} from 'src/app/auth/store/selectors'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backEndErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: FormBuilder, 
    private store: Store, 
    ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backEndErrors$ = this.store.pipe(select(validationErrorsSelector))
    console.log('isSubmitting$', this.isSubmitting$)
  }

  initializeForm(): void {
    console.log('initializeForm')
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid)
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
    
  }
}
