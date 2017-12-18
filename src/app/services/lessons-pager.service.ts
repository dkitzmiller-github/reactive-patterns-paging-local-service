import {Injectable} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';

@Injectable()
export class LessonsPagerService {

    private static readonly PAGE_SIZE = 3;
    private subject = new BehaviorSubject<Lesson[]>([]);
    lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();
    currentPageNumber = 1;
    private courseId: number;

    constructor(private http: Http) {

    }

    loadFirstPage(courseId: number) {
        this.courseId = courseId;
        this.loadPage(this.currentPageNumber);
    }

    previous() {
        if ( this.currentPageNumber >= 0) {
            this.currentPageNumber -= 1;
        }
        this.loadPage(this.currentPageNumber);
    }

    next() {

        this.currentPageNumber += 1;
        this.loadPage(this.currentPageNumber);
    }

    loadPage(pageNumber: number) {

        this.http.get('/api/lessons', {
            params: {
                courseId: this.courseId,
                pageNumber: pageNumber,
                pageSize: LessonsPagerService.PAGE_SIZE
            }
        })
            .map(res => res.json().payload)
            .subscribe( lessons => this.subject.next(lessons));

    }
}
