const questions = [
  {
    id: 1,
    type: "text",
    text: "Enter the name of your process",
  },
  {
    id: 2,
    type: "textarea",
    text: "Process Description",
  },
  {
    id: 3,
    type: "radio",
    text: "Primary reason for automation",
    options: [
      "Productivity",
      "Cost",
      "Risk",
      "Revenue",
      "I don't know",
    ],
  },
  {
    id: 4,
    type: "radio",
    text: "Is each step in the process clearly defined and documented",
    options: [
      "Yes",
      "No",
      "I don't know",
    ],
  },
  {
    id: 5,
    type: "radio",
    text: "How frequently are the identical steps in the process repeated?",
    options: [
      "Always",
      "Mostly",
      "Sometimes",
      "Never",
      "I don't know",
    ],
  },
  {
    id: 6,
    type: "radio",
    text: "How frequently is process/parts of process expected to undergo any changes?",
    options: [
      "Frequently",
      "Occasionally",
      "Rarely",
      "Defined process: No changes expected",
      "I don't know",
    ],
  },
  {
    id: 7,
    type: "radio",
    text: "Could this process potentially experience periods of unusually high demand?",
    options: [
      "Always",
      "Mostly",
      "Sometimes",
      "Never",
      "I don't know",
    ],
  },
  {
    id: 8,
    type: "radio",
    text: "How much of the data used in the process is in a structured digital format?",
    options: [
      "All of the data is structured and digital",
      "Most of the data is structured and digital",
      "Some of the data is structured and digital",
      "None of the data is structured and digital",
      "I don't know",
    ],
  },
  {
    id: 9,
    type: "radio",
    text: "Can the applications and system security measures used during the process be accessed by a digital worker?",
    options: [
      "Applications and systems don’t require authentication, or only require username and password",
      "Applications and systems can be accessed via API",
      "Some applications and systems require human input to authenticate (Multi-factor authentication, CAPTCHA etc)",
      "Applications and systems require regular human input",
      "I don't know",
    ],
  },
  {
    id: 10,
    type: "radio",
    text: "Are performance measurements in place for the as-is process?",
    options: [
      "Yes, every part of the process has measurable performance metrics",
      "A large amount of process has measurable performance metrics",
      "Half of the process has measurable performance metrics",
      "Not much of the process has measurable performance metrics",
      "I don't know",
    ],
  },
];

export default questions;
