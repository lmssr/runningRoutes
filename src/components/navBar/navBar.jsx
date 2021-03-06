import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import fire from "../firebase";
import NavBarLogo from "./navBarComponents/NavBarLogo";
import UserAccount from "./navBarComponents/UserAccount";
import MyRoutes from "./navBarComponents/MyRoutes";
import LogOutButton from "./navBarComponents/LogOutButton";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      email: "",
      password: "",
      toggleMyMaps: false,
      message: "",
    };
  }

  toggleMyMaps = () => {
    let toggle = !this.state.toggleMyMaps;
    this.setState({
      toggleMyMaps: toggle,
    });

    this.props.toggleMyMaps(toggle);
  };

  homePageView = () => {
    this.setState({
      toggleMyMaps: false,
    });
    this.props.toggleMyMaps(false);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({ message: "", errorIsActive: false });
        console.log("LogIn Detailes", this.state.email, this.email.password);
      })
      .catch((error) => {
        this.setState({ message: error.message, errorIsActive: true });
        console.log("Log in error");
      });
  }

  signup(e) {
    e.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({ message: "", errorIsActive: false });
        console.log("SignUp Details", this.state.email, this.email.password);
      })
      .catch((error) => {
        this.setState({ message: error.message, errorIsActive: true });
        console.log("SignUp Error");
      });
  }

  logout() {
    fire.auth().signOut();
    console.log("LogOut");
  }

  hideAlert = () => {
    console.log("You called?");
    this.setState({
      errorIsActive: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          sticky="top"
          className="navbarCustom"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <NavBarLogo homePageView={this.homePageView} />
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          <Navbar.Collapse sticky="top" id="responsive-navbar-nav">
            <div className="user-nav">
              <form>
                {/* <div className="row user-login-container">
                  {this.props.user ? (
                    <React.Fragment>
                      <MyRoutes
                        toggleMyMaps={this.toggleMyMaps}
                        toggleMyMapsState={this.state.toggleMyMaps}
                        logout={this.props.logout}
                      />
                      <LogOutButton logout={this.logout} />
                    </React.Fragment>
                  ) : (
                    <UserAccount
                      email={this.state.email}
                      password={this.state.password}
                      login={this.login}
                      signup={this.signup}
                      handleChange={this.handleChange}
                    />
                  )}
                </div> */}
              </form>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
