import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { constants as PLACEHOLDER_CONST } from "../../Constant/Placeholder";
import { constants as COLOR_CONST } from "../../Constant/index";
import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import CustomInput from "../../components/Custom/TextInput";
import CustomButton from "../../components/Custom/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Spinner from "../../components/Common/CustomLoader/loader";
import { AddSectionAPI } from "../../services/AuthService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const AddSection = () => {
  const [dynamicData, setDynamicData] = useState([
    { field_name: "", field_value: "" },
  ]);
  const [isError, setIsError] = useState(false);
  const [jsonError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const AddRecipeOptionsSchema = Yup.object().shape({
    section_type: Yup.string()
      .trim()
      // .matches(COLOR_CONST.SPACE_REGEX, ERROR_CONST.SPACE)
      .required(ERROR_CONST.ERROR_6),
  });

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      section_type: values.section_type,
      dynamic_data: JSON.parse(JSON.stringify(dynamicData)),
    };
    startLoading();
    AddSectionAPI(data)
      .then((res) => {
        NotificationManager.success(ERROR_CONST.SUCC_1, "", 1000);
        setDynamicData([{ field_name: "", field_value: "" }]);
        stopLoading();
        resetForm();
      })
      .catch((err) => {
        const data =
          err && err.response && err.response.data && err.response.data.error;
        if (data.message === "err_6") {
          NotificationManager.error(ERROR_CONST.ERROR_6, "", 1000);
        } else if (data.message === "err_7") {
          NotificationManager.error(ERROR_CONST.ERROR_7, "", 1000);
        } else {
          NotificationManager.error(ERROR_CONST.SOMETHING_WRONG, "", 1000);
        }
        stopLoading();
      });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...dynamicData];
    list[index][name] = value;
    setDynamicData(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...dynamicData];
    list.splice(index, 1);
    setDynamicData(list);
  };

  const handleAddClick = () => {
    setDynamicData([...dynamicData, { field_name: "", field_value: "" }]);
  };

  let disabled = false;
  //   let disabledEdit = false;
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
                    Add Section
                  </h4>
                </div>
              </div>
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{ section_type: "" }}
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
                        {dynamicData.map((json, i) => {
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
                                    handleInputChange(e, i);
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
                                    handleInputChange(e, i);
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
                                    onClick={() => handleRemoveClick(i)}
                                  ></i>
                                )}
                              </div>
                              {dynamicData.length - 1 === i && (
                                <Button
                                  type="button"
                                  onClick={handleAddClick}
                                  className="mt-2 ml-2"
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          );
                        })}

                        {dynamicData &&
                          dynamicData.map((json) => {
                            return !json.field_name.trim() ||
                              !json.field_value.trim()
                              ? (disabled = true)
                              : (disabled = false);
                          })}
                        <FormGroup style={{ marginTop: 30 }}>
                          <CustomButton
                            type="submit"
                            onSubmit={(values) => handleSubmit(values)}
                            disabled={isError || disabled ? true : false}
                          >
                            Add Section
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

export default AddSection;
