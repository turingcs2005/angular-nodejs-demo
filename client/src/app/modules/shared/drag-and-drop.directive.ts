/* This is a standalone directive offering 2 utilities:
  1. Wiggling: when dragover -> host starts to wiggle; when dragleave or drop -> host wiggling stops
  2. File drop: when files are dropped on host -> host wiggling stops and FileList emitted by fileDropped custom event
*/

import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @HostBinding('class.wiggle') wiggle: boolean = false;
  @Output() fileDropped = new EventEmitter<FileList>();

  startWiggling(event: DragEvent) {
    event.preventDefault();  // disable default behavior, e.g. PDF files dragover opens file in a browser
    event.stopPropagation(); // disable parent component behavior
    this.wiggle = true;       
  }

  stopWiggling(event: DragEvent) {
    event.preventDefault();  
    event.stopPropagation(); 
    this.wiggle = false;       
  }

  @HostListener('dragover', ['$event']) onDragoOver(event: DragEvent) {
    this.startWiggling(event); // start wiggling on dragover
  }

  @HostListener('dragleave', ['$event']) onDragoLeave(event: DragEvent) {
    this.stopWiggling(event);  // stop wiggling on dragleave
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.stopWiggling(event);  // stop wiggling on drop
    let files = event.dataTransfer?.files;
    if (files?.length) {       // files?.length is equivalent to files && files.length > 0, as null and 0 both evaluates to false
      this.fileDropped.emit(files);  // emit a file list
    }
  }

  constructor() { }

}