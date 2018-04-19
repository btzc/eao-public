import { Component } from '@angular/core';

@Component({
  selector: 'app-submit-comment-modal',
  templateUrl: './submit-comment-modal.component.html',
  styleUrls: ['./submit-comment-modal.component.scss']
})
export class SubmitCommentModalComponent {
  constructor() { };

  triggerSubmitComment() {
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
  }

  hideAllSteps() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
  }
}
