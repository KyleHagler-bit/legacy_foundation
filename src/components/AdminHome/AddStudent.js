import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from "moment";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import { withRouter } from "react-router";



class AddStudent extends Component {

      state = {
    first_name: '',
    last_name: '',
    grade: '',
    grad_year: '',
    school_attend: '',
    lcf_id: '',
    lcf_start_date: '',
    student_email: '',
    password: '',
    pif_amount: '',
    email_error: false,
    lcfID_error: false,
    error: false,
    created_at: moment.utc().format()

      }

      componentDidMount() {
         this.props.dispatch({
           type: "GET_STUDENTS",
         });
      }

//This function dispatched our newly added student to the database from state
//We first validate the inputs to make sure we are not sending empty inputs to the server
      registerStudent = (event) => {
        console.log('Are we in here');
    event.preventDefault();

 
    if (this.state.first_name&&
        this.state.last_name&&
        this.state.grade&&
        this.state.grad_year&&
        this.state.school_attend&&
        this.state.lcf_id&&
        this.state.lcf_start_date&&
        this.state.student_email&&
        this.state.password&&
        this.state.pif_amount
        ) {


           
// console.log('we are about to send the state', this.state);
        
  let allStudents = this.props.students;
//   console.log("this.props.student", this.props.students)

  for (let student of allStudents){
    
    if (student.student_email === this.state.student_email){
       this.setState({
         email_error: true,
       })

       setTimeout(() => {
         this.setState({
           email_error: false,
         });
       }, 5000);
       return;
    }

    if(Number(student.lcf_id) === Number(this.state.lcf_id)){
      this.setState({
        lcfID_error: true,
      })

      setTimeout(() => {
        this.setState({
          lcfID_error: false,
        });
      }, 5000);
      return;
    }
  }

  const {
    first_name,
    last_name,
    grade,
    grad_year,
    school_attend,
    lcf_id,
    lcf_start_date,
    student_email,
    password,
    pif_amount
  } = this.state;

  Swal.fire({
      title: "Please confirm new student details below",
      html: `1. First Name: ${first_name} </br>
          2. Last Name: ${last_name} </br>
          3. Grade: ${grade} </br>
          4. Graduation Year: ${grad_year} </br>
          5. School Name: ${school_attend} </br>
          6. LCF ID: ${lcf_id} </br>
          7. LCF Start Date: ${lcf_start_date} </br>
          8. Student Email: ${student_email} </br>
          9. Password: ${password}</br>
          10. PIF Amount ${pif_amount}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm my entry",
  }).then((result) => {
    console.log("Here is result.value", result.value);
  if (result.value) {
    this.props.dispatch({
      type: 'REGISTER_STUDENT',
        payload: {
          first_name: first_name,
          last_name: last_name,
          grade: grade,
          grad_year: grad_year,
          school_attend: school_attend,
          lcf_id: lcf_id,
          lcf_start_date: lcf_start_date,
          student_email: student_email,
          password: password,
          pif_amount: pif_amount,

        },
    });

    Swal.fire("Success!", "Your new student has been added.", "success");
    this.props.history.push("/home");
  
}
});
} else {
     
            this.setState({
              error: true,
            });

            setTimeout(() => {
              this.setState({
                error: false,
              });
            }, 5000);
             this.props.dispatch({ type: "ADD_STUDENT_ERROR" });
    }
} // end registerStudent





//This function handles storing input values into state on change
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

    render () {
      return (
        <div>
          <div className="navbuttonscontainer">
            <Link to="/home">
              <Button variant="outline-primary">Home</Button>
            </Link>{" "}
          </div>

          <br />
          {this.state.email_error === true && (
            <Alert className="error" style={{}} severity="error">
              The email you entered already exists in the system, pick a new
              one!
            </Alert>
          )}
          <br />
          {this.state.lcfID_error === true && (
            <Alert className="error" style={{}} severity="error">
              The LCF ID you chose already exists in the system, pick a new one!
            </Alert>
          )}
          {this.state.error === true && (
            <Alert className="error" style={{}} severity="error">
              Please fill out all of the required fields
            </Alert>
          )}

          <h1 style={{ width: "50%", margin: "2% 40%" }}>Add A Student</h1>

          <Card
            border="info"
            style={{ width: "90%", margin: "3% auto", padding: "2%" }}
          >
            <Form className="addstudent">
              <Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleInputChangeFor("first_name")}
                  />
                </Col>

                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder="Last Name"
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleInputChangeFor("last_name")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      this.setState({ grade: event.target.value })
                    }
                  >
                    <option value="">Pick From Below</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Graduation Year</Form.Label>
                  <Form.Control
                    placeholder="Enter Graduation Year"
                    type="number"
                    name="grad_year}"
                    min={new Date().getFullYear()}
                    value={this.state.grad_year}
                    onChange={this.handleInputChangeFor("grad_year")}
                  />
                </Col>
                <Col>
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    placeholder="School Name"
                    type="text"
                    name="school_attend"
                    value={this.state.school_attend}
                    onChange={this.handleInputChangeFor("school_attend")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>LCF ID:</Form.Label>
                  <Form.Control
                    placeholder="Enter LCF ID"
                    type="number"
                    name="lcf_id"
                    value={this.state.lcf_id}
                    onChange={this.handleInputChangeFor("lcf_id")}
                  />
                </Col>
                <Col>
                  <Form.Label>LCF Start Date</Form.Label>
                  <Form.Control
                    placeholder="LCF Start Date"
                    type="date"
                    name="lcf_start_date"
                    value={this.state.lcf_start_date}
                    onChange={this.handleInputChangeFor("lcf_start_date")}
                  />
                </Col>
                <Col>
                  <Form.Label>PIF Contribution</Form.Label>
                  <Form.Control
                    placeholder="PIF Contribution"
                    type="number"
                    name="pif_amount"
                    value={this.state.pif_amount}
                    onChange={this.handleInputChangeFor("pif_amount")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Student Email</Form.Label>
                  <Form.Control
                    placeholder="Student Email"
                    type="email"
                    name="student_email"
                    value={this.state.student_email}
                    onChange={this.handleInputChangeFor("student_email")}
                  />
                </Col>
                <Col>
                  <Form.Label>Student Password</Form.Label>
                  <Form.Control
                    placeholder="Student Password"
                    type="text"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor("password")}
                  />
                </Col>
              </Row>

              <Button
                onClick={(event) => this.registerStudent(event)}
                variant="success"
                type="submit"
                style={{ width: "40%", margin: "7% 30% 2%" }}
              >
                Submit Student Info
              </Button>
            </Form>
          </Card>
        </div>
      );
    }
}



const mapStateToProps = state => ({
  user: state.user,
  students: state.students.studentlist,
});
   
export default withRouter(connect(mapStateToProps)(AddStudent));