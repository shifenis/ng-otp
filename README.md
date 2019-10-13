# Angular Otp Verification

One Time Password verification input component for Angular 7+.

[Online demo](https://akhilmohanan.github.io/ng-otp/) is here.

## Installation and usage

To install this component to an external project, follow the procedure:

1. **npm install ng-otp**
2. Add **NgOtpModule** import to your **@NgModule** like example below

  ```javascript
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { AppComponent } from './app.component';
  import { NgOtpModule } from 'ng-otp';

  @NgModule({
  declarations: [
  AppComponent
  ],
  imports: [
  BrowserModule,
  NgOtpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```

  Add **ng-otp** selector to template

```html
<ng-otp [limit]="4" [allowedCharacters]="characters" (otpOut)="setOtp($event)"></ng-otp>
```

## Attributes

### Options attribute

Option            | Default | Type                       | Description
----------------- | ------- | -------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
limit             | 4       | number                     | Enter the number of inputs in the OTP screen. By default limit is set to four.
allowedCharacters | /./     | string or RegExp           | You can give a string of characters you want. It's only allows these characters in input. It also accept a `Regex` to be able to test single character of input. By default it accpect all characters
typeOfInput       | text    | `text` `password` `number` | Use native HTML input properties for selected type (like hided text in case of password and so on)

## Callbacks

### otpOut

- Called every time the user fill the spaces (thought to send it to server)
- Output format is in string

  ```javascript
  characters = 'abcdefghijklmnopqrstuvwxyz';
  setOtp(otp: string) {
  console.log('the opt is ', otp);
  }
  ```
