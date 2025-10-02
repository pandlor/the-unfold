import { Users, Globe, Calendar, FileText, Target } from "lucide-react";

export const DATA_DESCRIPTION_QUESTIONS = [
  {
    id: 1,
    title: "Description of the Research Group",
    description: "Provide a detailed description of the research group: who the participants are, their sample size, key demographic characteristics, or other essential information.",
    field: "researchGroup",
    icon: Users
  },
  {
    id: 2,
    title: "Where Was the Data Collected?",
    description: "Specify the location of data collection (e.g., geographical location or platform).",
    field: "dataLocation",
    icon: Globe
  },
  {
    id: 3,
    title: "When Was the Data Collected?",
    description: "Indicate the period during which data collection took place.",
    field: "dataCollectionTime",
    icon: Calendar
  },
  {
    id: 4,
    title: "How Was the Data Collected?",
    description: "Describe the methods used for data collection, such as online surveys, interviews, or observations.",
    field: "dataCollectionMethod",
    icon: FileText
  },
  {
    id: 5,
    title: "What Is the Objective of the Study?",
    description: "Define the main goal of the study, such as analyzing consumer preferences or assessing service satisfaction.",
    field: "studyObjective",
    icon: Target
  }
];
