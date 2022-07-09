import React, { useState } from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  FormGroup,
  Input,
} from "reactstrap";
import { constants as COLOR_CONST } from "../../Constant/index";
import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import CustomButton from "../../components/Custom/Button";
import { Formik, Form } from "formik";
import { AddSectionSchema } from "./AddSectionSchema";
import { EditSectionAPI } from "../../services/AuthService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Spinner from "../../components/Common/CustomLoader/loader";

const Home = (props) => {
  const section_type =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.section_type;
  const dynamic_data =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.dynamic_data;
  const section_id =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.section_id;

  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const handleSubmit = (values) => {
    console.log("values=====handleSubmit==================", values);
    const data = {
      dynamic_data: values,
    };

    startLoading();
    EditSectionAPI(section_id, data)
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
                    {section_type}
                  </h4>
                </div>
              </div>
              <Card>
                <CardBody>
                  <Formik
                    initialValues={dynamic_data}
                    validationSchema={AddSectionSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, values, handleChange }) => (
                      <Form>
                        <Row>
                          {dynamic_data &&
                            Object.keys(dynamic_data).map((dynamic, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <Col md="6">
                                    <FormGroup>
                                      <label htmlFor="section_type">
                                        {dynamic}
                                      </label>
                                      <Input
                                        type="text"
                                        value={values[dynamic]}
                                        name={dynamic}
                                        errors={errors}
                                        touched={touched}
                                        onChange={handleChange}
                                        autoComplete={"off"}
                                        className="form-control mb-0"
                                      />

                                      {errors[dynamic] && touched[dynamic] && (
                                        <div
                                          style={{ fontSize: 14 }}
                                          className="text-left mt-1 text-danger"
                                        >
                                          {errors[dynamic]}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                        </Row>

                        <FormGroup>
                          <CustomButton
                            type="submit"
                            onSubmit={(values) => handleSubmit(values)}
                          >
                            Save
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

export default Home;
