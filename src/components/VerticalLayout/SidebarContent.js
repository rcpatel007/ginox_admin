import React, { Component } from "react";

// MetisMenu
// import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";
// import { constants as PATH } from "../../Constant/ComponentPath";
import { GetAllSections } from "../../services/AuthService";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionData: [],
    };
  }

  getSectionData() {
    let pagination = "?page=1&limit=10";
    GetAllSections(pagination)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        this.setState({
          sectionData: data,
        });
      })
      .catch((err) => {});
  }

  componentDidMount() {
    this.initMenu();
    this.getSectionData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    // new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  condition(section) {
    let className = "";
    if (section.section_path === "Home") {
      className = "ri-home-fill";
    } else if (section.section_path === "about") {
      className = "ri-user-fill";
    } else if (section.section_path === "Features") {
      className = "ri-book-fill";
    } else if (section.section_path === "Media_Partner") {
      className = "ri-film-fill";
    } else if (section.section_path === "Investors_Partners") {
      className = "ri-money-dollar-box-fill";
    } else if (section.section_path === "Tokenomics") {
      className = "ri-wechat-fill";
    } else if (section.section_path === "Roadmap") {
      className = "ri-git-branch-fill";
    } else if (section.section_path === "Core_Team") {
      className = "ri-team-fill";
    } else {
      className = "ri-home-fill";
    }
    return className;
  }

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            {this.state.sectionData &&
              this.state.sectionData.map((section, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={{
                        pathname: `/admin/${section.section_path.toLowerCase()}`,
                        state: {
                          section_type: section.section_type,
                          dynamic_data: section.dynamic_data,
                          section_id: section.home_section_id,
                        },
                      }}
                      className="waves-effect"
                    >
                      <i className={this.condition(section)}></i>
                      <span className="ml-1">
                        {this.props.t(`${section.section_type}`)}
                      </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
