import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Course} from '../model/course';

import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

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

  save(){
    const rxjsCourseRef = this.db.doc('/courses/7zaz8AOSlYY0jP0EwNWu').ref
    const angularCourseRef = this.db.doc('/courses/v4kgYxEE14SYfdFOzwv1').ref

    const batch = this.db.firestore.batch();

    batch.update(rxjsCourseRef, {titles: {description: 'Rxjs Course'}})
    batch.update(angularCourseRef, {titles: {description: 'Curso de Angulaaar'}})

    const batch$ = of(batch.commit())
    batch$.subscribe()

    console.log(batch)
  }

  async runTransaction(){
    const newCounter = await this.db.firestore.runTransaction(async transaction =>{
      
      console.log("Running transaction...");

      const courseRef = this.db.doc('/courses/VVZH6YCagrynUsfQp38K').ref

      const snap = await transaction.get(courseRef)

      const course = <Course> snap.data()
      const lessonsCount = course.lessonsCount +1

      transaction.update(courseRef, {lessonsCount})

      return lessonsCount
    });

    console.log(`Result lessons count: ${newCounter}`)
  }

}
