import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchStudentHistory(action) {
    try {
        const response = yield axios.get(`/api/student/history/${action.payload}`)
        console.log('send info to student history reducer', response)
        yield put({ type: "SET_STUDENT_HISTORY", payload: response.data });
    } catch (error) {
        console.log("problem with setting student history", error)
    }
}


function* addEntrySaga() {
  
  yield takeLatest("FETCH_STUDENT_HISTORY", fetchStudentHistory)
}

export default studentHistorySaga;