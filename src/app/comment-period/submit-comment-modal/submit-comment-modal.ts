import { Component } from '@angular/core';
import { CommentPeriodService } from '../../services/comment-period.service';
import { CommentPeriodComponent } from '../comment-period.component';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-submit-comment-modal',
  templateUrl: './submit-comment-modal.component.html',
  styleUrls: ['./submit-comment-modal.component.scss']
})
export class SubmitCommentModalComponent {
  files = [];

  constructor(private commentPeriodService: CommentPeriodService, private commentPeriodComponent: CommentPeriodComponent) { };

  triggerSubmitComment() {
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
  }

  onFileChange(event, form) {
    const fileInput = <HTMLInputElement>document.getElementById('file');
    if (event.target.files.length > 0) {
      const filesList = event.target.files;
      for (let i = 0; i < filesList.length; i++ ) {
        if (this.files.length > 0) {
          const namesArray = this.files.map(file => file.name);
          if (!namesArray.includes(filesList[i].name)) {
            this.files.push(filesList[i]);
          } else {
            console.log('error stuff here');
          }
        } else {
          this.files.push(filesList[i]);
        }
      }
      fileInput.value = '';
    }
  }

  onSubmit(form) {
    const htmlForm = <HTMLFormElement>document.getElementById('submitCommentForm');
    const commentPeriodId = this.commentPeriodComponent.commentPeriod._id;
    const projectId = this.commentPeriodComponent.commentPeriod.project._id;
    const commentForm = {
      userCan: {},
      period: commentPeriodId,
      project: projectId,
      author: form.author,
      location: form.location,
      isAnonymous: form.visible,
      comment: form.comment
    };


    const documentsForms = [];
    this.files.forEach((doc, index) => {
      const document = new FormData();
      document.append('file', doc, doc.name);
      documentsForms.push(document);
    });

    const options = new RequestOptions();

    this.commentPeriodService.submitComment(projectId, documentsForms, commentForm, options).subscribe(
      data => {
        htmlForm.reset();
        this.files = [];
        console.log(data);
      },
      error => console.log(error)
    );
  }

  removeDocument(event) {
    const deleteButton = event.target;
    const fileName = deleteButton.closest('.attachment-list__item').children[0].innerHTML.trim();

    this.files.forEach((file, index) => {
      if (file.name === fileName) {
        this.files.splice(index, 1);
      }
    });
  }

  hideAllSteps() {
    const form = <HTMLFormElement>document.getElementById('submitCommentForm');
    form.reset();
    this.files = [];
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

  }
}
