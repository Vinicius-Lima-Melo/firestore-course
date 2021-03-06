import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'app/model/course';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {convertSnaps} from 'app/services/db-util'
import { OrderByDirection } from '@firebase/firestore-types';
import { Lesson } from 'app/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  

  constructor(private db: AngularFirestore) { }

  saveCourse(courseId: string, changes:Partial<Course>):Observable<any>{
    return from(this.db.doc(`courses/${courseId}`).update(changes))
  }

  loadAllCourses(): Observable<Course[]>{
    //  return this.db.collection('courses', ref => ref.orderBy('seqNo').where("seqNo", "==", 2)).snapshotChanges()
     return this.db.collection('courses', 
            // ref =>  ref.where('categories', "array-contains", "BEGINNER")
            //   .startAt(0).endAt(5)
            // )
            ref => ref.orderBy('seqNo'))
            .snapshotChanges()
            .pipe(
              map(snaps => convertSnaps<Course>(snaps)), 
              first())
  }

  findCourseByUrl(courseUrl: string) {
    return this.db.collection('courses', ref => ref.where("url", "==", courseUrl))
                  .snapshotChanges()  
                  .pipe(
                    map(snaps => {
                     const courses =  convertSnaps<Course>(snaps)

                     return courses.length == 1 ? courses[0]: undefined
                    }),
                    first()
                  )
  }
  findLessons(courseId:string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3):Observable<Lesson[]>{
      return this.db.collection(`courses/${courseId}/lessons`, 
            ref => ref
            .orderBy('seqNo', sortOrder)
            .limit(pageSize)
            .startAfter(pageNumber * pageSize))
            .snapshotChanges()
            .pipe(
              map(snaps => convertSnaps<Lesson>(snaps)),
              first()
            )
  }
  
}
