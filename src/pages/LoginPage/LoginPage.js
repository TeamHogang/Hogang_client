import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import { PrimaryColor } from "../../utils/style";
import { Login } from "../../api/userApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  flex-direction: column;
  border-radius: 5px;
  box-sizing: border-box;
  width: 350px;
  padding: 20px 0;
  margin: 65px 0 20px 0px;
`;

const Title = styled.div`
  display: flex;
  height: 50px;
  font-size: xx-large;
  font-weight: 700;
`;

const Sub = styled.div`
  margin-bottom: 10px;
`;

const RegisterLink = styled.a`
  color: ${PrimaryColor};
  text-decoration: none;
  font-weight: 900;
  font-size: 18px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
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
`;

const LoginButton = styled.button`
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
`;

function LoginPage() {
  const navigate = useNavigate();
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        let data = {
          email: values.email,
          password: values.password,
        };
        Login(data).then((res) => {
          console.log(res);
          if (res.data.loginSuccess) {
            window.localStorage.setItem("X-AUTH-TOKEN", res.data.userId);
            navigate("/");
          }
        });
        setSubmitting(false);
      }, 500);
    },
  });
  return (
    <Container>
      <LoginContainer>
        <Title>로그인</Title>
        <Sub>
          또는 <RegisterLink href="/register">회원가입</RegisterLink>
        </Sub>
        <Form onSubmit={formik.handleSubmit}>
          <p />
          <InputContainer>
            아이디
            <Input
              required
              id="email"
              type="text"
              name="email"
              placeholder="아이디를 입력해주세요."
              onChange={formik.handleChange}
              value={formik.values.email || ""}
            />
          </InputContainer>
          <InputContainer>
            비밀번호
            <Input
              required
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </InputContainer>
          <p />
          <LoginButton
            // onClick={handleSubmit}
            htmlType="submit"
            type="primary"
          >
            로그인
          </LoginButton>
        </Form>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;
