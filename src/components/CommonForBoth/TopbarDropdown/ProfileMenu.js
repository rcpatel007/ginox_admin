import React, { Component } from "react";
import { constants as PATH } from "../../../Constant/ComponentPath";
import SweetAlert from "react-bootstrap-sweetalert";
import { STORAGEKEY } from "../../../Constant/index";

//i18n
import { withNamespaces } from "react-i18next";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      username: "",
      profile_image: "",
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.togglemodal = this.togglemodal.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  togglemodal() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  logout() {
    localStorage.removeItem(STORAGEKEY.ACCESSTOKEN);
    this.props.history.history.push(PATH.LOGIN);
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {/* <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className='d-inline-block user-dropdown'
        >
          <DropdownToggle
            tag='button'
            className='btn header-item waves-effect'
            id='page-header-user-dropdown'
          >
            <img
              className='rounded-circle header-profile-user mr-1'
              src={profile}
              alt='Header Avatar'
            />
            <span className='d-none d-xl-inline-block ml-1 text-transform'>
              {username}
            </span>
            <i className='mdi mdi-chevron-down d-none ml-1 d-xl-inline-block'></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to={PATH.PROFILE}>
              <i className='ri-user-line align-middle mr-1'></i>{' '}
              {this.props.t('Profile')}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <div style={{ marginTop: 15 }}>
          <i
            className="ri-logout-circle-r-fill"
            style={{
              color: "#4152a2",
              fontSize: 26,
              fontWeight: "bold",
            }}
            onClick={this.togglemodal}
          ></i>
          <SweetAlert
            danger
            btnSize="lg"
            show={this.state.modal}
            showCancel
            cancelBtnBsStyle="danger"
            confirmBtnBsStyle="success"
            title={
              <span style={{ fontSize: 20 }} className="text-center">
                Are you sure you want to log out?
              </span>
            }
            onConfirm={this.logout}
            onCancel={() => this.togglemodal(false)}
          ></SweetAlert>
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(ProfileMenu);
