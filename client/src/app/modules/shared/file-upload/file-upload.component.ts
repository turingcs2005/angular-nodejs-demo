import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private http: HttpClient
  ) {}

  upload(files: FileList) {
    let f = Array.from(files);
    console.log(`%c 🐉 ${files.length} files have been selected:\n 📕 ${Array.from(files).map(x => x.name).join('\n 📕 ')}`, 'color: green')
  }
  
  hello() {}

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
  

}
