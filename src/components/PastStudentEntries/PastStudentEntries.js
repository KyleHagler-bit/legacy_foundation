import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './PastStudentEntries.css';
import EntryItem from '../PastEntriesItem/PastEntriesItem';
import Paper from "@material-ui/core/Paper";
import moment from "moment";

class PastStudentEntries extends Component {
  componentDidMount() {
    //fetches music list from database on mount
      this.props.dispatch({ type: 'FETCH_STUDENT_HISTORY', payload: this.props.user.lcf_id});
       this.props.dispatch({ type: "FETCH_ENTRY", });
  }

  
  render() {
    const gunnarStyle = { minHeight: "500px", minWidth: "150px", textAlign:'center' };
    
    if (this.props.entry.length===0 && this.props.history.length===0) { //conditional rendering to handle case of no entries for student
      return (
        <Paper elevation={5} style={{margin:'5%', padding:'5%', textAlign:'center'}}>
          <h2>It looks like you don't have any past entries! Check back once you've made one</h2>
        </Paper>
      )

    } else {

        const currEntry = this.props.entry;
        let entry = '';
        for (let newEntry of currEntry) {
          if (newEntry.lcf_id === this.props.user.lcf_id){
              entry = newEntry;
          }
        }

    return (
      <div style={{margin:'5%'}}>
      <center>
        <h4>Scroll along the table to review past entries</h4>
      </center>

      <Paper elevation={5} style={{height: "100%", overflow: "scroll", border: "",}}>
        <Table style={{margin:'1%',}}>
          <TableHead>
            <TableRow style={gunnarStyle}>
              <TableCell style={gunnarStyle}>Entry ID</TableCell>
              <TableCell style={gunnarStyle}>Pay Day</TableCell>
                 <TableCell style={gunnarStyle}>Date Submitted</TableCell>
              <TableCell style={gunnarStyle}>Passing All Classes?</TableCell>
              <TableCell style={gunnarStyle}>GPA</TableCell>
              <TableCell style={gunnarStyle}>Days Of Clean Attendance</TableCell>
              <TableCell style={gunnarStyle}>Detention Hours?</TableCell>
              <TableCell style={gunnarStyle}>School Activity Or Job?</TableCell>
              <TableCell style={gunnarStyle}>Drug Free Lifestyle?</TableCell>
              <TableCell style={gunnarStyle}>Accumulated Service Hours</TableCell>
              <TableCell style={gunnarStyle}>Did You Attend Homeroom?</TableCell>
              <TableCell style={gunnarStyle}>Comments</TableCell>
              <TableCell style={gunnarStyle}>Attendenance Payment ($)</TableCell>
              <TableCell style={gunnarStyle}>PIF Donations ($)</TableCell>
              <TableCell style={gunnarStyle}>Bonus Amount ($)</TableCell>
              <TableCell style={gunnarStyle}>Bonus Comments</TableCell>
              <TableCell style={gunnarStyle}>GPA Bonus Amount ($)</TableCell>
              <TableCell style={gunnarStyle}>Savings Contribution ($)</TableCell>
              <TableCell style={gunnarStyle}>Balance to be Paid ($)</TableCell>
              <TableCell style={gunnarStyle}>Debt Owed ($)</TableCell>
              <TableCell style={gunnarStyle}>Debt Payment ($)</TableCell>
              <TableCell style={gunnarStyle}>Remaining Debt Balance ($)</TableCell>
              <TableCell style={gunnarStyle}>Total ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {this.props.entry ? (<TableRow style={{backgroundColor: 'yellow'}} >
            <TableCell style={gunnarStyle}>Latest Entry</TableCell>
            <TableCell style={gunnarStyle}>{moment(entry.pay_day).format("MMMM Do YYYY")}</TableCell>
            <TableCell style={gunnarStyle}>{moment(entry.date_submitted).local().format("MMMM Do YYYY")}</TableCell>
            <TableCell style={gunnarStyle}>{entry.pass_class}</TableCell>
            <TableCell style={gunnarStyle}>{entry.gpa}</TableCell>
            <TableCell style={gunnarStyle}>{entry.clean_attend}</TableCell>
            <TableCell style={gunnarStyle}>{entry.detent_hours}</TableCell>
            <TableCell style={gunnarStyle}>{entry.act_or_job}</TableCell>
            <TableCell style={gunnarStyle}>{entry.passed_ua}</TableCell>
            <TableCell style={gunnarStyle}>{entry.current_service_hours}</TableCell>
            <TableCell style={gunnarStyle}>{entry.hw_rm_attended}</TableCell>
            <TableCell style={gunnarStyle}>{entry.comments}</TableCell>
            <TableCell style={gunnarStyle}>Pending Approval</TableCell>
            <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
            <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
            <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
           <TableCell style={gunnarStyle}>Pending Approval</TableCell>
            <TableCell style={gunnarStyle}>Pending Approval</TableCell>
          </TableRow>
          ) : ('')}
          
            {
            this.props.studentHistory.map((entryItem, index) => {
              // if (index >= this.props.user.id === entryItem.student_id) {
                return <EntryItem key={entryItem.id} entryItem={entryItem} />;
              // }
            })}
          </TableBody>
          
        </Table>
        </Paper>
        <div>Total savings to date ($):</div>
      </div>
    );}
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  studentHistory: state.studentHistory.studentHistoryReducer,
   entry: state.entry.entryList,
});

export default withRouter(connect(mapStateToProps)(PastStudentEntries));
