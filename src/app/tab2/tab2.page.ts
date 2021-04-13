import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  constructor(
    afs: AngularFirestore,
    private router: Router
  ) {
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  toDetail(doc:string){
    this.router.navigate([`detail/${doc}`])
    
  }

  hapus(doc:string){
    this.isiDataColl.doc(doc).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
}

interface data {
  judul : string
  isi : string
  nilai : string
  date : string
  image : string
}