import { AlertifyService } from './../../../services/alertify/alertify.service';
import { UserService } from './../../../services/user/user.service';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Photo } from './../../../models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getPersonPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseURL = environment.apiURL;
  currentMainPhoto: Photo;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'users/' + this.authenticationService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const result: Photo = JSON.parse(response);
        const photo = {
          id: result.id,
          url: result.url,
          dateAdded: result.dateAdded,
          description: result.description,
          isMainPhoto: result.isMainPhoto
        };

        this.photos.push(photo);

        if (photo.isMainPhoto) {
          this.authenticationService.changePhoto(photo.url);
          this.authenticationService.currentUser.photoURL = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authenticationService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authenticationService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentMainPhoto = this.photos.filter(p => p.isMainPhoto === true)[0];
      this.currentMainPhoto.isMainPhoto = false;
      photo.isMainPhoto = true;
      this.authenticationService.changePhoto(photo.url);
      this.authenticationService.currentUser.photoURL = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authenticationService.currentUser));
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authenticationService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertifyService.success('Photo has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete the photo');
      });
    });
  }

}
