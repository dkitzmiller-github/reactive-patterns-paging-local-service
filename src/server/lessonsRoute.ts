
import {dbData} from "./db-data";
import * as _ from 'lodash';


export function lessonsRoute(req, res) {

    console.log(req.query);

    const courseId = parseInt(req.query['courseId'], 10) - 1,
        pageNumber = parseInt(req.query['pageNumber'], 10),
        pageSize = parseInt(req.query['pageSize'], 10);

    const lessons = dbData[courseId].lessons;

    const start = ( pageNumber - 1 ) * pageSize,
        end = start + pageSize;

    const lessonsPage = _.slice(lessons, start, end );

    res.status(200).json({payload: lessonsPage.map(buildLessonSummary)});

}


function buildLessonSummary({url, description, duration}, index) {
    return {
        url,
        description,
        seqNo: index,
        duration
    }
}

