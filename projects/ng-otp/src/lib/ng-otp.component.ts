import { Component, Input, OnDestroy, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgOtpService } from './ng-otp.service';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'ng-otp',
  templateUrl: './ng-otp.component.html',
  styleUrls: ['./ng-otp.component.scss']
})
export class NgOtpComponent implements OnInit, OnDestroy {

  @Input() limit: number;
  @Input() acceptableCharacters: string;
  @Output() otpOut = new EventEmitter();

  otpForm: FormGroup;
  limitArray = [];
  isKeyAcceptable = true;
  changeFocus$ = new Subject();
  subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private ngOtpService: NgOtpService
  ) {
    this.subscription.add(this.changeFocus$
      .pipe(
        throttleTime(100)
      ).subscribe(
        (index: number) => { this.changeFocus(index); }
      )
    );
  }

  ngOnInit() {
    this.limit = this.limit ? this.limit : 4;
    this.setFormBuilder();
  }

  setFormBuilder() {
    this.otpForm = this.formBuilder.group({});
    this.limitArray = Array.from(Array(this.limit).keys());
    this.limitArray.map((element) => {
      this.otpForm.addControl(`otp-${element}`, new FormControl('', Validators.required));
    });
  }

  changeFocus(id: number) {
    if (!this.isKeyAcceptable) {
      this.isKeyAcceptable = true;
      return;
    }
    const currentElement: HTMLInputElement = this.ngOtpService.getElement(id);
    if (id && this.ngOtpService.isEmptySting(currentElement.value)) {
      this.moveBackward(id);
    } else if (this.ngOtpService.isLastInput(id, this.limit - 1)) {
      currentElement.select();
    } else if (!this.ngOtpService.isEmptySting(currentElement.value)) {
      this.moveForward(id);
    }
    this.otpOut.emit(Object.values(this.otpForm.value).join(''));
  }

  moveForward(id: number) {
    const nextElement: HTMLInputElement = this.ngOtpService.getElement(id + 1);
    nextElement.focus();
  }

  moveBackward(id: number) {
    const nextElement: HTMLInputElement = this.ngOtpService.getElement(id - 1);
    nextElement.focus();
  }

  onFocus(id) {
    const currentElement: HTMLInputElement = this.ngOtpService.getElement(id);
    currentElement.select();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyDown(event) {
    if (event.key && (event.key !== 'Backspace' && event.key !== 'Delete')) {
      if (this.acceptableCharacters && !this.acceptableCharacters.includes(event.key)) {
        this.isKeyAcceptable = false;
        event.preventDefault();
      }
    }
  }

}
