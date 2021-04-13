import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FotoService, Photo } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul: string;
  Isi: string;
  Nilai: string;
  myDate: string = new Date().toString();

  constructor(
    afs: AngularFirestore,
    public fotoService:FotoService,
    public afStorage : AngularFireStorage,
    public toastCtrl : ToastController
  ) {
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  simpan(){
    
    const imgfilepath = `filestorage/${this.fotoUpload.filePath}`;
    this.afStorage.upload(imgfilepath, this.fotoUpload.dataImage).then(()=> {
      console.log(this.fotoUpload);
      this.showToast();
    });

    this.isiDataColl.doc(this.Judul).set({
      judul: this.Judul,
      isi: this.Isi,
      nilai: this.Nilai,
      date: this.myDate,
      image: imgfilepath
    });
  }

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  fototitle : string;
  fotoUpload : Photo;

  getNama(judulFoto : Photo) {
    this.fotoUpload = judulFoto;
    this.fototitle = judulFoto.filePath;
  }

  uploadData() {
    
  }

  async showToast() {
    await this.toastCtrl.create({
      message: 'Upload Selesai',
      duration : 2000,
      position : 'middle'
    }).then(res => res.present());
  }
}

interface data {
  judul : string
  isi : string
  nilai : string
  date : string
  image : string
}
