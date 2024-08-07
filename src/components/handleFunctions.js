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
        4: { "Yes": 5, "No": 2, "Not Sure": 1 },
        5: { "Always": 5, "Mostly": 4, "Sometimes": 3, "Rarely": 2, "Never": 1 },
        6: { "Always": 5, "Frequently": 4, "Sometimes": 3, "Rarely": 2, "Never": 1 },
        7: { "Always": 5, "Frequently": 4, "Sometimes": 3, "Rarely": 2, "Never": 1 },
        8: { "All of the data is structured and digital": 5, "Most of the data is structured and digital": 4, "Some of the data is structured and digital": 3, "Very little of the data is structured and digital": 2, "None of the data is structured and digital": 1 },
        9: { "Applications and systems don’t require authentication, or only require username and password": 5, "Most of the applications and systems require username and password": 4, "Some of the applications and systems require username and password": 3, "Very few of the applications and systems require username and password": 2, "None of the applications and systems require username and password": 1 },
        10: { "Yes, every part of the process has measurable performance metrics": 5, "Most parts of the process have measurable performance metrics": 4, "Some parts of the process have measurable performance metrics": 3, "Very few parts of the process have measurable performance metrics": 2, "No parts of the process have measurable performance metrics": 1 },
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