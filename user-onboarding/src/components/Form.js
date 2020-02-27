import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({ values, errors, touched, status }) => {

  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    console.log("status has changed!", status);
   
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="user-form">
      {}
      <Form>
        {}
        <label htmlFor="name">
          Name
          <Field id="name" type="text" name="name" placeholder="name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email
          <Field id="email" type="text" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
        Password
          <Field id="password" type="password" name="password" placeholder="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        
        <label className="checkbox-container">
        Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>
        <button type="submit">Submit!</button>
      </Form>

      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      tos: props.tos || false
      
    };
  },


  validationSchema: Yup.object().shape({
    name: Yup.string().required().min(5, "Too small" ),
    
    email: Yup.string().email("Enter valid email").min(15, "Too small" ),
    password: Yup.string().required("need a password").min(5, "Too small" )

  }),


  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
     
        setStatus(res.data);

      
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
