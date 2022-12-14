import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PrimaryColor } from "../../utils/style";
import { Register } from "../../api/userApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
`;

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  flex-direction: column;
  border-radius: 5px;
  box-sizing: border-box;
  width: 350px;
  margin: 65px 0 20px 0px;
  padding: 20px 0;
`;

const Title = styled.div`
  display: flex;
  height: 50px;
  font-size: xx-large;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 250px;
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid #e6e8e7;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 15px;
  font-family: "Do Hyeon", sans-serif;
`;

const RegisterButton = styled.button`
  width: 250px;
  border: none;
  color: ${PrimaryColor};
  text-align: center;
  line-height: 2.5rem;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  margin: auto 0px;
  background-color: white;
  border: 1px solid #e6e8e7;
  font-family: "Do Hyeon", sans-serif;
`;

function RegisterPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        let data = {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        };
        console.log(data);
        Register(data).then((res) => {
          console.log(res);
          if ((res.code = 200)) {
            alert("??????????????? ?????????????????????.");
            navigate("/login");
          }
        });
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <Container>
      <RegisterContainer>
        <Title>?????? ??????</Title>
        <p />
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            ?????????
            <Input
              required
              type="text"
              id="email"
              placeholder="???????????? ??????????????????"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            ?????????
            <Input
              required
              type="text"
              id="nickname"
              placeholder="?????????"
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            ????????????
            <Input
              required
              type="password"
              id="password"
              placeholder="????????????"
              onChange={formik.handleChange}
            />
          </InputContainer>
          <InputContainer>
            ???????????? ??????
            <Input
              required
              type="password"
              id="confirmPassword"
              placeholder="???????????? ??????"
              onChange={formik.handleChange}
            />
          </InputContainer>
          <p />
          <RegisterButton htmlType="submit" type="primary">
            ?????? ??????
          </RegisterButton>
        </Form>
      </RegisterContainer>
    </Container>
  );
}

export default RegisterPage;
