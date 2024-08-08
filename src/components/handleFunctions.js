import { SCENARIOS } from "./scenarios";

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

export { getScenario, calculateScore };