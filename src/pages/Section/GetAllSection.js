import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import { constants as COLOR_CONST } from "../../Constant/index";
import { constants as PATH } from "../../Constant/ComponentPath";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Custom/Button";
import Pagination from "react-js-pagination";
import EmptyView from "../../components/EmptyView";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Spinner from "../../components/Common/CustomLoader/loader";
import { GetAllSections } from "../../services/AuthService";
import DeleteSection from "./DeleteSection";

const GetAllSection = () => {
  const [sectionData, setSectionData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    GetAllSectionData(activePage, limit);
    // eslint-disable-next-line
  }, []);

  const GetAllSectionData = (activePage, limit) => {
    let pagination = `?page=${activePage}&limit=${limit}`;
    startLoading();
    GetAllSections(pagination)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        const count = res && res.data && res.data.data && res.data.data.count;
        setTotalItemCount(count);
        setSectionData(data);
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    GetAllSectionData(pageNumber, limit);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <div>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0" style={{ color: COLOR_CONST.COLOR }}>
                    Sections
                  </h4>
                </div>
              </div>

              <Card>
                <CardBody>
                  <div style={{ textAlign: "right", marginBottom: 10 }}>
                    <Link to={PATH.ADD_SECTION}>
                      <CustomButton>Add Section +</CustomButton>
                    </Link>
                  </div>

                  <div className="table-responsive">
                    {isLoading && <Spinner />}

                    <Table
                      hover
                      className="mb-0"
                      style={{ tableLayout: "fixed", wordWrap: "break-word" }}
                    >
                      <thead className="thead-light">
                        <tr className="text-center">
                          <th style={{ width: "10%" }}>SR No</th>
                          <th style={{ width: "30%" }}>Section Type</th>
                          <th style={{ width: "20%" }}>Field Name</th>
                          <th style={{ width: "30%" }}>Field Description</th>
                          <th style={{ width: "20%" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectionData && sectionData.length === 0 && (
                          <tr>
                            <td colSpan={5}>
                              <EmptyView
                                title="Sorry!"
                                description={"No any sections data found."}
                                icon={COLOR_CONST.SAD_EMOJI}
                                bgcolor={"white"}
                              />
                            </td>
                          </tr>
                        )}

                        {sectionData &&
                          sectionData.map((section, i) => (
                            <TableData
                              tableData={section}
                              key={i}
                              index={i + 1}
                              limit={limit}
                              activePage={activePage}
                              GetAllSectionData={GetAllSectionData}
                            />
                          ))}
                      </tbody>
                      <tfoot>
                        {sectionData.length > 0 && (
                          <tr>
                            <td colSpan={5}>
                              <Pagination
                                activePage={activePage}
                                itemsCountPerPage={limit}
                                totalItemsCount={totalItemCount}
                                pageRangeDisplayed={10}
                                itemClass="page-item"
                                linkClass="page-link"
                                onChange={handlePageChange}
                                className="pagination"
                              />
                            </td>
                          </tr>
                        )}
                      </tfoot>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <NotificationContainer />
    </React.Fragment>
  );
};

export default GetAllSection;

export const TableData = (props) => {
  const { tableData, index, limit, activePage, GetAllSectionData } = props;

  const [sweetAlert, setSweetAlert] = useState(false);

  const toggleAlert = () => {
    setSweetAlert(!sweetAlert);
  };

  return (
    <tr className="text-center">
      <th scope="row" style={{ width: "10%" }}>
        {index + limit * (activePage - 1)}
      </th>
      <td style={{ width: "30%" }}>{tableData.section_type}</td>
      <td style={{ width: "20%" }}>
        {/* {tableData &&
          tableData.dynamic_data.map((field, i) => {
            return (
              <div key={i} className="mb-3">
                {field && field.field_name}
              </div>
            );
          })} */}
      </td>
      <td style={{ width: "30%" }}>
        {/* {tableData &&
          tableData.dynamic_data.map((field, i) => {
            return (
              <div key={i} className="mb-3">
                {field && field.field_value}
              </div>
            );
          })} */}
      </td>
      <td style={{ width: "30%" }}>
        <Link
          to={{
            pathname: PATH.EDIT_SECTION,
            state: {
              section_id: tableData.home_section_id,
              dynamic_data: tableData.dynamic_data,
              section_type: tableData.section_type,
            },
          }}
        >
          <i
            className="ri-pencil-fill"
            style={{
              marginLeft: "9px",
              color: "#363A41",
              fontSize: 22,
              fontWeight: "bold",
            }}
          ></i>
        </Link>

        <i
          className="ri-delete-bin-6-line"
          style={{
            marginLeft: "9px",
            color: "#363A41",
            fontSize: 22,
            fontWeight: "bold",
          }}
          onClick={() => setSweetAlert(!sweetAlert)}
        ></i>

        {sweetAlert ? (
          <DeleteSection
            isOpen={toggleAlert}
            sectionId={tableData.home_section_id}
            GetAllSectionData={GetAllSectionData}
            activePage={activePage}
          />
        ) : null}
      </td>
    </tr>
  );
};
