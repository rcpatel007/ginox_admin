import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import CustomInput from "../../components/Custom/TextInput";
import CustomButton from "../../components/Custom/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthLogin, GetAllSections } from "../../services/AuthService";
import { STORAGEKEY } from "../../Constant";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Spinner from "../../components/Common/CustomLoader/loader";
import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import { constants as PLACEHOLDER_CONST } from "../../Constant/Placeholder";
import { constants as PATH } from "../../Constant/ComponentPath";
// import logodark from "../../assets/images/logo-dark.png";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(ERROR_CONST.EMAIL)
      .required(ERROR_CONST.EMAIL_REQ),
    password: Yup.string()
      .required(ERROR_CONST.PASS_REQ)
      .min(8, ERROR_CONST.ERROR_2),
  });

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    startLoading();

    AuthLogin(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        localStorage.setItem(STORAGEKEY.ACCESSTOKEN, data.accessToken);
        GetAllSections(`?page=1&limit=1`)
          .then((res) => {
            const data = res && res.data && res.data.data && res.data.data.data;
            props.history.push({
              pathname: PATH.HOME,
              state: {
                section_type: data[0].section_type,
                dynamic_data: data[0].dynamic_data,
                section_id: data[0].home_section_id,
              },
            });
          })
          .catch((err) => {});
        // props.history.push(PATH.HOME);
        stopLoading();
        resetForm();
      })
      .catch((err) => {
        const errorMessage = err.response.data.error.message;
        if (errorMessage === "err_1") {
          NotificationManager.error(ERROR_CONST.ERROR_1, "", 1000);
        } else if (errorMessage === "err_2") {
          NotificationManager.error(ERROR_CONST.ERROR_2, "", 1000);
        } else if (errorMessage === "err_3") {
          NotificationManager.error(ERROR_CONST.ERROR_3, "", 1000);
        } else if (errorMessage === "err_4") {
          NotificationManager.error(ERROR_CONST.ERROR_4, "", 1000);
        } else if (errorMessage === "err_5") {
          NotificationManager.error(ERROR_CONST.ERROR_5, "", 1000);
        } else {
          NotificationManager.error(ERROR_CONST.SOMETHING_WRONG, "", 1000);
        }
        stopLoading();
      });
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <Col lg={4}>
              {isLoading && <Spinner />}
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <div>LOGO HERE</div>
                            {/* <img src={logodark} height="20" alt="LOGO HERE" /> */}
                          </div>

                          <h4 className="font-size-20 p-2">Welcome Back !</h4>
                        </div>

                        <div className="p-2 mt-3 text-center">
                          <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={LogInSchema}
                            onSubmit={handleSubmit}
                          >
                            {({ errors, touched, values, handleChange }) => (
                              <Form>
                                <CustomInput
                                  type="text"
                                  values={values}
                                  placeholder={PLACEHOLDER_CONST.EMAIL}
                                  name="email"
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  iconName={"ri-user-fill"}
                                />

                                <CustomInput
                                  type="password"
                                  values={values}
                                  placeholder={PLACEHOLDER_CONST.PASSWORD}
                                  name="password"
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  isPassword
                                />

                                <div className="mt-4 text-center">
                                  <CustomButton
                                    type="submit"
                                    name="btn"
                                    className="custombtn"
                                    onSubmit={(values) => handleSubmit(values)}
                                  >
                                    Log In
                                  </CustomButton>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="authentication-bg"></div>
            </Col>
          </Row>
        </Container>
      </div>

      <NotificationContainer />
    </React.Fragment>
  );
};

export default Login;
