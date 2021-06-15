import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {CoursesService} from '../services/courses.service'
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    courses$: Observable<Course[]>
    beginnersCourses$ : Observable<Course[]>
    advencedCourses$ : Observable<Course[]>
    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {
       this.reloadCourses()
    }  
    reloadCourses(){
        this.courses$ = this.coursesService.loadAllCourses();
        
        // this.db.collection('courses').snapshotChanges()
        //     .pipe(map(snaps => {
        //         return snaps.map(snap =>{
        //             return <Course>{
        //                 id: snap.payload.doc.id,
        //                 ...snap.payload.doc.data() as {}
        //             }
        //         });
        //     }));
        this.beginnersCourses$ = this.courses$
            .pipe(map(courses => courses.filter(course => course.categories.includes("BEGINNER")))
        )
        this.advencedCourses$ = this.courses$
            .pipe(map(courses => courses.filter(course => course.categories.includes("ADVANCED")))
        )
    } 
}
