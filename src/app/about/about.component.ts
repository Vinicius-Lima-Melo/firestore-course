import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Course} from '../model/course';

import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // this.db.collection('courses').valueChanges().subscribe(val => console.log(val)) -> retorna os dados da collection
    // this.db.collection('courses').stateChanges() -> Retorna o campo editado
    // this.db.collection('courses').snapshotChanges()
    // .subscribe(snaps => {
    //   const courses: Course[] = snaps.map(snap =>{
    //     return <Course>{
    //       id: snap.payload.doc.id,
    //       ...snap.payload.doc.data() as {}
    //     }
    //   })
    //   console.log(courses)
    // })
  }


}
