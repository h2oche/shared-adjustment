import React, { Component } from 'react'
import {Grid, Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Button} from "@material-ui/core";
import {LooksOutlined} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles"
import LoginStyle from "../styles/Login";

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
    console.log(this.state);
    console.log("Try to login");
    _e.preventDefault();
  }

  render() {
    const {classes} = this.props;
  
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onLogin}>
                  Login
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(LoginStyle)(Login);
