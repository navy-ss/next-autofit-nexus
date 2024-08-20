import { SCENARIOS } from "./scenarios";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getScenario = (score) => {
    if (score >= 33) return SCENARIOS[0];
    if (score >= 27) return SCENARIOS[1];
    if (score >= 21) return SCENARIOS[2];
    if (score >= 16) return SCENARIOS[3];
    return SCENARIOS[4];
};

const calculateScore = (answers) => {
    let score = 0;
    const questionPoints = {
        4: { "Yes": 5, "No": 2, "I don't know": 1 },
        5: { "Always": 5, "Mostly": 4, "Sometimes": 3, "Never": 2, "I don't know": 1 },
        6: { "Frequently": 5, "Occasionally": 4, "Rarely": 3, "Defined process: No changes expected": 2, "I don't know": 1 },
        7: { "Always": 5, "Mostly": 4, "Sometimes": 3, "Never": 2, "I don't know": 1 },
        8: { "All of the data is structured and digital": 5, "Most of the data is structured and digital": 4, "Some of the data is structured and digital": 3, "None of the data is structured and digital": 2, "I don't know": 1 },
        9: { "Applications and systems don’t require authentication, or only require username and password": 5, "Applications and systems can be accessed via API": 4, "Some applications and systems require human input to authenticate (Multi-factor authentication, CAPTCHA etc)": 3, "Applications and systems require regular human input": 2, "I don't know": 1 },
        10: { "Yes, every part of the process has measurable performance metrics": 5, "A large amount of process has measurable performance metrics": 4, "Half of the process has measurable performance metrics": 3, "Not much of the process has measurable performance metrics": 2, "I don't know": 1 },
    };
    Object.keys(answers).forEach((key) => {
        const questionNumber = parseInt(key.split('_')[1], 10);
        const answer = answers[key];
        if (questionNumber >= 4 && questionPoints[questionNumber]) {
            score += questionPoints[questionNumber][answer] || 0;
        }
    });
    return score;
};

const getProcessQuestions = () => {
    return Promise.all([
        axios.get(`${API_URL}/process_questions`),
        axios.get(`${API_URL}/roi_questions`)
    ]).then((responses) => {
        const processQuestions = responses[0].data;
        const roiQuestions = responses[1].data;
        return { processQuestions, roiQuestions };
    }).catch((error) => {
        console.log(error);
        throw error; // Re-throw the error to be caught by the calling function if necessary
    });
}

const getDashboardData = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/process/dashboard`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const saveProcessData = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/save_process_data`, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const editProcessData = (data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/edit_process_data`, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const saveRoiData = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/save_calculate_roi_data`, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const editRoiData = (data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/edit_calculate_roi_data`, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { getScenario, calculateScore, getProcessQuestions, getDashboardData, saveProcessData, editProcessData, saveRoiData, editRoiData };