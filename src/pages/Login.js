import React, { Component } from 'react'
import {Grid, CssBaseline, Avatar, Typography, TextField, Button, CircularProgress, FormControlLabel} from "@material-ui/core";
import {LooksOutlined} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles"
import LoginStyle from "../styles/Login";
import {signIn, loginPageStatus} from "../store/reducers/login";
import {connect} from "react-redux";

export class Login extends Component {
  // styles = LoginStyle();
  state = {
    email: "",
    password: ""
  }

  onEmailChange = (_event) => {
    this.setState({...this.state, email: _event.target.value});
  }

  onPasswordChange = (_event) => {
    this.setState({...this.state, password: _event.target.value});
  }

  onLogin = (_e) => {
    const {email, password} = this.state;
    const {signIn} = this.props;
    signIn(email, password);
    _e.preventDefault();
  }

  renderFormControl = (_status) => {
    const {classes} = this.props;

    if(_status === loginPageStatus.initial) {
      return (<Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={this.onLogin}>
        Login
      </Button>);
    } else if(_status === loginPageStatus.pending) {
      return (
      <div>
        <Typography component="h5" className={classes.center}>로그인 중 입니다..</Typography>
        <div className={classes.progress}>
          <CircularProgress/>
        </div>
      </div>);
    } else {
      return (
        <div>
          <Typography component="h5" className={classes.center}>이메일/패스워드가 맞지 않습니다</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onLogin}>
            Login
          </Button>
        </div>
      )
    }
  }

  render() {
    const {classes, status} = this.props;

    return (
      <div>
        <CssBaseline/>
        <Grid container className={classes.root}>
          <Grid item xs={8} className={classes.wall}/>
          <Grid item xs={4}>
            <div className={classes.paper}>
              <Avatar>
                <LooksOutlined/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email address"
                  name="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.onEmailChange}/>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}/>
                {this.renderFormControl(status)}
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.login.status
});
const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(LoginStyle)(Login));
