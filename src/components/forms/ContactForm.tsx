import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@/components/common/Button';
import axios from 'axios';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
`;

const Select = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
`;

const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const RecaptchaContainer = styled.div`
  margin: 1.5rem 0;
`;

const SuccessMessage = styled.div`
  background-color: #c6f6d5;
  color: #2f855a;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  department: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  department: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^[0-9+\-\s()]*$/, 'Invalid phone number'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  department: Yup.string().required('Please select a department')
});

const ContactForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);
  
  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };
  
  const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    if (!recaptchaValue) {
      setSubmitStatus({
        success: false,
        message: 'Please complete the reCAPTCHA verification'
      });
      return;
    }
    
    try {
      const response = await axios.post('/api/contact', {
        ...values,
        recaptchaToken: recaptchaValue
      });
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!'
      });
      
      resetForm();
      setRecaptchaValue(null);
      
      // Reset reCAPTCHA
      if (typeof window !== 'undefined') {
        const recaptchaElement = document.querySelector('.g-recaptcha');
        if (recaptchaElement) {
          // @ts-ignore
          grecaptcha.reset();
        }
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    }
  };
  
  return (
    <FormContainer>
      {submitStatus && submitStatus.success && (
        <SuccessMessage>{submitStatus.message}</SuccessMessage>
      )}
      
      {submitStatus && !submitStatus.success && (
        <ErrorMessage>{submitStatus.message}</ErrorMessage>
      )}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input type="text" id="name" name="name" />
              <ErrorMessage name="name" component={ErrorText} />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input type="email" id="email" name="email" />
              <ErrorMessage name="email" component={ErrorText} />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" name="phone" />
              <ErrorMessage name="phone" component={ErrorText} />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="department">Department *</Label>
              <Select as="select" id="department" name="department">
                <option value="">Select a department</option>
                <option value="general">General Inquiry</option>
                <option value="support">Customer Support</option>
                <option value="business">Business Development</option>
                <option value="partnerships">Partnerships</option>
                <option value="careers">Careers</option>
                <option value="media">Media & Press</option>
              </Select>
              <ErrorMessage name="department" component={ErrorText} />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input type="text" id="subject" name="subject" />
              <ErrorMessage name="subject" component={ErrorText} />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea as="textarea" id="message" name="message" />
              <ErrorMessage name="message" component={ErrorText} />
            </FormGroup>
            
            <RecaptchaContainer>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />
            </RecaptchaContainer>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              disabled={isSubmitting || !recaptchaValue}
              isLoading={isSubmitting}
            >
              Send Message
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ContactForm;