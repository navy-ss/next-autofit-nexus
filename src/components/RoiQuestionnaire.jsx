// RoiQuestionnaire.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Progress, message, Typography, Spin } from 'antd';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PropTypes from 'prop-types';
import RoiResult from './RoiResult';
import HeaderTitle from './HeaderTitle';
import '../styles/components/Questionnaire/index.scss';
import { useSelector } from 'react-redux';
import { saveRoiData, editRoiData } from './handleFunctions';

const { Title } = Typography;

const RoiQuestionnaire = () => {
    const location = useLocation(); // Get location to access state
    const { dashboard_automation_id, initial_values, result_data } = location.state || {}; // Destructure state from location
    const roiQuestions = useSelector((state) => state.global.roiQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [animation, setAnimation] = useState('fade-in');
    const [answers, setAnswers] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (result_data) {
            setData(result_data);
            setSubmitted(true);
        } else if (initial_values) {
            form.setFieldsValue(initial_values);
        }
    }, [form, initial_values, result_data]);

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
                saveRoiData(payload)
                    .then((data) => {
                        setSubmitted(true);
                        setData(data);
                        message.success('Data saved successfully!');
                    })
                    .catch((error) => {
                        message.error(error.message);
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
                    editRoiData({ dashboard_automation_id, answers: payload })
                        .then((data) => {
                            setSubmitted(true);
                            setData(data);
                            message.success('Data saved successfully!');
                        }
                        )
                        .catch((error) => {
                            message.error(error.message);
                        }
                        )
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
        setCurrentQuestion(0);
        setSubmitted(false);
        setAnswers({});
    };

    const progressPercent = ((currentQuestion + 1) / roiQuestions.length) * 100;

    const validateNumber = (_, value) => {
        if (value < 0) {
            return Promise.reject(new Error('Value cannot be less than 0'));
        }
        return Promise.resolve();
    };

    if (submitted) {
        return (
            <RoiResult
                // answers={answers}
                onRetest={handleRetest}
                resultData={data}
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
                    initialValues={{}}
                    key={currentQuestion}
                >
                    <div className={animation}>
                        {roiQuestions.map((question, index) => (
                            currentQuestion === index && (
                                <Form.Item
                                    key={question.id}
                                    name={`question_${question.id}`}
                                    label={<Title level={3} style={{ fontFamily: 'Roboto, sans-serif' }}>{question.text}</Title>}
                                    rules={[
                                        { required: true, message: 'Please provide an answer!' },
                                        { validator: validateNumber },
                                    ]}
                                >
                                    <Input
                                        type="number"
                                        addonBefore={question.type === "currency" ? '$' : null}
                                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px' }}
                                    />
                                </Form.Item>
                            )
                        ))}
                    </div>
                    <Form.Item>
                        <Button type="default" onClick={handlePrev} disabled={currentQuestion === 0} style={{ marginRight: '8px' }}>
                            Previous
                        </Button>
                        {currentQuestion < roiQuestions.length - 1 ? (
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

// RoiQuestionnaire.propTypes = {
//     questions: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number,
//             type: PropTypes.string,
//             text: PropTypes.string,
//         })
//     ).isRequired,
// };

export default RoiQuestionnaire;
