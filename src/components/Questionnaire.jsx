import { useState } from 'react';
import { Card, Form, Input, Radio, Button, Progress, message, Typography } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import Result from './Result';
import '../styles/components/Questionnaire/index.scss';
import { getScenario, calculateScore } from './handleFunctions';

const { Title } = Typography;
const { TextArea } = Input;

const Questionnaire = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [animation, setAnimation] = useState('fade-in');
  const [answers, setAnswers] = useState({});
  const [scenario, setScenario] = useState(null);

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
        const payload = { ...answers, ...values };
        const score = calculateScore(payload);
        const scenario = getScenario(score);
        setScenario(scenario);
        setSubmitted(true);
        message.success('Submitted successfully');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleRetest = () => {
    setCurrentQuestion(0);
    setSubmitted(false);
    setAnswers({});
    form.resetFields();
  };

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  if (submitted) {
    return (
      <Result
        scenarioTitle={scenario.title}
        scenarioDescription={scenario.description}
        onRetest={handleRetest}
      />
    );
  }

  return (
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
      <Form form={form} layout="vertical" initialValues={answers}>
        <div className={animation}>
          <Form.Item
            name={`question_${questions[currentQuestion].id}`}
            label={<Title level={3} style={{ fontFamily: 'Roboto, sans-serif' }}>{questions[currentQuestion].text}</Title>}
            rules={[{ required: true, message: 'Please provide an answer!' }]}
          >
            {questions[currentQuestion].type === 'text' ? (
              <Input style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }} />
            ) : questions[currentQuestion].type === 'textarea' ? (
              <TextArea rows={4} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }} />
            ) : (
              <Radio.Group>
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <Radio value={option} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }}>{option}</Radio>
                  </div>
                ))}
              </Radio.Group>
            )}
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="default" onClick={handlePrev} disabled={currentQuestion === 0} style={{ marginRight: '8px' }}>
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button type="primary" onClick={handleNext}>Next</Button>
          ) : (
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          )}
        </Form.Item>
        <Progress percent={progressPercent} showInfo={false} />
      </Form>
    </Card>
  );
};

Questionnaire.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      text: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default Questionnaire;