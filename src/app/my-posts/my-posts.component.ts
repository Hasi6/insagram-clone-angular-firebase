import { Component, OnInit } from '@angular/core';
import {FireService} from '../shared/fire.service';
import {NotificationService} from '../shared/notification.service';
import {compareLogSummaries} from '@angular/core/src/render3/styling/class_and_style_bindings';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private fire: FireService,
              private notifier: NotificationService,
              private router: Router) { }

  ngOnInit() {
  }

  onFileSelection(event) {

    const fileList: FileList = event.target.files;

    if ( fileList.length > 0 ) {
      const file: File = fileList[ 0 ];
      this.fire.uploadFile(file)
        .then(data => {
          this.notifier.display('success', 'The Image is Successfully Uploaded!!');
          console.log(data['fileUrl']);
          this.router.navigate(['/allposts']);
        })
        .catch(err => {
          this.notifier.display('error', err.message);
        });
    }
  }


}
