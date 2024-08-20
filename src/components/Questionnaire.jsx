import { useState, useEffect } from 'react';
import { Card, Form, Input, Radio, Button, Progress, message, Typography, Spin } from 'antd';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PropTypes from 'prop-types';
import Result from './Result';
import HeaderTitle from './HeaderTitle';
import '../styles/components/Questionnaire/index.scss';
// import { getScenario, calculateScore } from './handleFunctions';
import { useSelector } from 'react-redux';
import { saveProcessData, editProcessData } from './handleFunctions';

const { Title } = Typography;
const { TextArea } = Input;

const Questionnaire = () => {
  const location = useLocation(); // Get location to access state
  const { dashboard_automation_id, initial_values } = location.state || {}; // Destructure state from location
  const processQuestions = useSelector((state) => state.global.processQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [animation, setAnimation] = useState('fade-in');
  const [answers, setAnswers] = useState({});
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial_values) {
      form.setFieldsValue(initial_values);
    }
  }, [form, initial_values]);

  const handleNext = () => {
    form.validateFields()
      .then((values) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          ...values,
        }));
        setAnimation('fade-out');
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setAnimation('fade-in');
        }, 500);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handlePrev = () => {
    setAnimation('fade-out');
    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1);
      setAnimation('fade-in');
    }, 500);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true);
        const payload = { ...answers, ...values };
        saveProcessData(payload)
          .then((data) => {
            setScenario(data);
            setSubmitted(true);
            message.success('Submitted successfully');
          })
          .catch((error) => {
            console.log(error);
            message.error('Failed to submit data');
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true);
        const payload = { ...answers, ...values };
        if (dashboard_automation_id) {
          editProcessData({ dashboard_automation_id: dashboard_automation_id, answers: payload })
            .then((data) => {
              setScenario(data);
              setSubmitted(true);
              message.success('Data saved successfully');
            })
            .catch((error) => {
              console.log(error);
              message.error('Failed to save data');
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleRetest = () => {
    form.resetFields();
    setScenario(null);
    setCurrentQuestion(0);
    setSubmitted(false);
    setAnswers({});
  };

  const progressPercent = ((currentQuestion + 1) / processQuestions.length) * 100;

  if (submitted) {
    return (
      <Result
        scenarioTitle={scenario.title}
        scenarioDescription={scenario.description}
        recordId={scenario.id}
        onRetest={handleRetest}
      />
    );
  }

  return (
    <Spin spinning={loading}>
      <HeaderTitle />
      <Card
        title={`Question ${currentQuestion + 1}`}
        className="questionnaire-card"
        styles={{
          header: {
            backgroundColor: '#034EA2',
            color: '#fff',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '24px',
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={process_questions}
          key={currentQuestion}  // Add key to reinitialize form when question changes
        >
          <div className={animation}>
            {processQuestions.map((question, index) => (
              currentQuestion === index && (
                <Form.Item
                  key={question.id}
                  name={`question_${question.id}`}
                  label={<Title level={3} style={{ fontFamily: 'Roboto, sans-serif' }}>{question.text}</Title>}
                  rules={[{ required: true, message: 'Please provide an answer!' }]}
                >
                  {question.type === 'text' ? (
                    <Input style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }} />
                  ) : question.type === 'textarea' ? (
                    <TextArea rows={4} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }} />
                  ) : (
                    <Radio.Group>
                      {question.options.map((option, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                          <Radio value={option} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }}>{option}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  )}
                </Form.Item>
              )
            ))}
          </div>
          <Form.Item>
            <Button type="default" onClick={handlePrev} disabled={currentQuestion === 0} style={{ marginRight: '8px' }}>
              Previous
            </Button>
            {currentQuestion < processQuestions.length - 1 ? (
              <Button type="primary" onClick={handleNext}>Next</Button>
            ) : dashboard_automation_id ? (
              <Button type="primary" onClick={handleSave}>Save</Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>Submit</Button>
            )}
          </Form.Item>
          <Progress percent={progressPercent} showInfo={false} />
        </Form>
      </Card>
    </Spin>
  );
};

// Questionnaire.propTypes = {
//   questions: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       type: PropTypes.string,
//       text: PropTypes.string,
//       options: PropTypes.arrayOf(PropTypes.string),
//     })
//   ).isRequired,
// };

export default Questionnaire;