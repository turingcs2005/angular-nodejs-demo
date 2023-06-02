import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() baseUrl = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  constructor(
    private http: HttpClient
  ) {}

  upload(files: FileList) {
    let fileArray = Array.from(files);
    console.log(`%c ${files.length} files have been selected:\n 📕 ${Array.from(files).map(x => x.name).join('\n 📕 ')}`, 'color: green');

    // test with 1st file 
    const formData = new FormData(); // FormData is an interface for name-value pairs
    fileArray.forEach(x => {
      formData.append(x.name, x);    // there is a risk of duplicate file names when saving files to hard drive
    });

    const upload$ = this.http.post(`${this.baseUrl}`, formData, {
      reportProgress: true,          // as POST call continues, event objects will be emitted to report on progress.
      observe: 'events'
    }).pipe(  // once observable completes or errors out, reset progress bar to null and upload subscription to null.
      finalize( () => this.reset() )
    );

    this.uploadSub = upload$.subscribe( event => {
      if (event.type == HttpEventType.UploadProgress && event.total && event.total > 0) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
      }
    });

    // upload$.subscribe();
  }

  //  🐉 on files dropped using drag-and-drop box
  onFilesDropped(files: FileList) {
    if (files.length) {
      this.upload(files);
    }
  }
  
  // 🔍 on files selected using file browser
  onFilesSelected($event: Event) {
    let files = (<HTMLInputElement>$event.target).files; 
    if (files && files.length) {
      this.upload(files);
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
