import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

doc:any;
isiData : Observable<data>;
isiDataDoc : AngularFirestoreDocument<data>;

judul : string
isi :string
nilai: string
tanggal:string
gambar:string


  constructor(
    afs: AngularFirestore,
    private activatedRoute: ActivatedRoute, 
    private router: Router
    ) { 
    this.activatedRoute.paramMap.subscribe(
      (data) => 
      console.log(data)
    )
    
    this.doc = this.activatedRoute.snapshot.paramMap.get('doc')

    this.isiDataDoc = afs.collection("notes").doc(this.doc.toString())
    this.isiData = this.isiDataDoc.valueChanges();
    
  }

  ngOnInit() {
  }

}

interface data {
  judul : string
  isi : string
  nilai : string
  date : string
  image : string
}