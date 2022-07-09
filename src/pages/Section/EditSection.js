import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { constants as COLOR_CONST } from "../../Constant/index";
import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import { constants as PLACEHOLDER_CONST } from "../../Constant/Placeholder";
import CustomButton from "../../components/Custom/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Spinner from "../../components/Common/CustomLoader/loader";
import { Formik, Form } from "formik";
import CustomInput from "../../components/Custom/TextInput";
import * as Yup from "yup";
import { EditSectionAPI } from "../../services/AuthService";

const EditSection = (props) => {
  const home_section_id =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.section_id;
  const dynamic_data =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.dynamic_data;
  const section_type =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.section_type;

  const [dynamicData, setDynamicData] = useState(dynamic_data);
  //   console.log("section_type--------------", props);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonError, setJsonError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editDynamicData, setEditDynamicData] = useState([]);

  const AddRecipeOptionsSchema = Yup.object().shape({
    section_type: Yup.string()
      .trim()
      // .matches(COLOR_CONST.SPACE_REGEX, ERROR_CONST.SPACE)
      .required(ERROR_CONST.ERROR_6),
  });

  const handleJsonInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...dynamicData];
    list[index][name] = value;
    setDynamicData(list);
  };

  const handleJsonRemoveClick = (index) => {
    const list = [...dynamicData];
    list.splice(index, 1);
    setJsonError(false);
    setIsError(false);
    setDynamicData(list);
  };

  const handleEditJsonInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...editDynamicData];
    list[index][name] = value;
    setEditDynamicData(list);
  };

  const handleEditJsonRemoveClick = (index) => {
    const list = [...editDynamicData];
    list.splice(index, 1);
    setJsonError(false);
    setIsError(false);
    setEditDynamicData(list);
  };

  const handleJsonAddClick = () => {
    setEditDynamicData([
      ...editDynamicData,
      { field_name: "", field_value: "" },
    ]);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    const data = {
      section_type: values.section_type,
      dynamic_data: JSON.parse(
        JSON.stringify(dynamicData.concat(editDynamicData))
      ),
    };
    startLoading();
    EditSectionAPI(home_section_id, data)
      .then((res) => {
        NotificationManager.success(ERROR_CONST.SUCC_3, "", 1000);
        stopLoading();
      })
      .catch((err) => {
        const errorMessage =
          err && err.response && err.response.data && err.response.data.error;
        if (errorMessage === "err_8") {
          NotificationManager.error(ERROR_CONST.ERROR_8, "", 1000);
        } else if (errorMessage === "err_9") {
          NotificationManager.error(ERROR_CONST.ERROR_9, "", 1000);
        } else {
          NotificationManager.error(ERROR_CONST.SOMETHING_WRONG, "", 1000);
        }
        stopLoading();
      });
  };

  let disabledEdit = false;

  useEffect(() => {
    if (jsonError) {
      setIsError(true);
    }
  }, [jsonError]);

  return (
    <React.Fragment>
      <div className="page-content">
        {isLoading && <Spinner />}

        <Container fluid>
          <Row>
            <Col xl={12}>
              <div>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0" style={{ color: COLOR_CONST.COLOR }}>
                    Edit Section
                  </h4>
                </div>
              </div>
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{ section_type: section_type }}
                    validationSchema={AddRecipeOptionsSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, values, handleChange }) => (
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label htmlFor="section_type">Section Type</label>

                              <CustomInput
                                type="text"
                                values={values}
                                placeholder={PLACEHOLDER_CONST.SECTION_NAME}
                                name="section_type"
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                autoComplete={"off"}
                                className="form-control mb-0"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        {/* <label htmlFor="category" className="mb-2 ">
                        Description
                      </label> */}
                        {dynamicData &&
                          dynamicData.map((json, i) => {
                            return (
                              <div className="form-row" key={i}>
                                <div className="form-group col-md-5">
                                  <label>Field Name</label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="field_name"
                                    value={json.field_name}
                                    onChange={(e) => {
                                      handleJsonInputChange(e, i);
                                    }}
                                    placeholder={PLACEHOLDER_CONST.FIELD_NAME}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label>Field Value</label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="field_value"
                                    value={json.field_value}
                                    onChange={(e) => {
                                      handleJsonInputChange(e, i);
                                    }}
                                    placeholder={PLACEHOLDER_CONST.FIELD_VALUE}
                                  />
                                </div>
                                <div className="form-group col-md-2 mt-4">
                                  {dynamicData && dynamicData.length !== 1 && (
                                    <i
                                      className="ri-delete-bin-6-line"
                                      style={{
                                        color: "#363A41",
                                        fontSize: 26,
                                        fontWeight: "bold",
                                      }}
                                      name="btn"
                                      onClick={() => handleJsonRemoveClick(i)}
                                    ></i>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                        {editDynamicData &&
                          editDynamicData.map((json, i) => {
                            return (
                              <div className="form-row" key={i}>
                                <div className="form-group col-md-5">
                                  <label>Field Name</label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="field_name"
                                    values={json.field_name}
                                    onChange={(e) => {
                                      handleEditJsonInputChange(e, i);
                                    }}
                                    placeholder={PLACEHOLDER_CONST.FIELD_NAME}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label>Field Value</label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="field_value"
                                    values={json.field_value}
                                    onChange={(e) => {
                                      handleEditJsonInputChange(e, i);
                                    }}
                                    placeholder={PLACEHOLDER_CONST.FIELD_VALUE}
                                  />
                                </div>
                                <div className="form-group col-md-2 mt-4">
                                  {dynamicData && (
                                    <i
                                      className="ri-delete-bin-6-line"
                                      style={{
                                        color: "#363A41",
                                        fontSize: 26,
                                        fontWeight: "bold",
                                      }}
                                      name="btn"
                                      onClick={() =>
                                        handleEditJsonRemoveClick(i)
                                      }
                                    ></i>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                        <Button
                          type="button"
                          onClick={handleJsonAddClick}
                          className="mt-2"
                        >
                          Add
                        </Button>

                        {editDynamicData &&
                          editDynamicData.map((json) => {
                            return !json.field_name.trim() ||
                              !json.field_value.trim()
                              ? (disabledEdit = true)
                              : (disabledEdit = false);
                          })}

                        <FormGroup style={{ marginTop: 30 }}>
                          <CustomButton
                            type="submit"
                            onSubmit={(values) => handleSubmit(values)}
                            disabled={isError || disabledEdit ? true : false}
                          >
                            Edit Section
                          </CustomButton>
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
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

export default EditSection;
