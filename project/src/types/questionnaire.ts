export interface UserPreferences {
  healthConcerns: string[];
  allergies: string[];
  dietaryPreferences: string[];
  completedQuestionnaire: boolean;
}

export interface QuestionnaireQuestion {
  id: string;
  category: 'healthConcerns' | 'allergies' | 'dietaryPreferences';
  question: string;
  options: string[];
  allowMultiple: boolean;
}

export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'health-1',
    category: 'healthConcerns',
    question: 'Do you have any of the following health conditions?',
    options: [
      'Diabetes',
      'Cardiovascular Disease',
      'Hypertension',
      'High Cholesterol',
      'None of the above'
    ],
    allowMultiple: true
  },
  {
    id: 'allergies-1',
    category: 'allergies',
    question: 'Do you have any of these common food allergies?',
    options: [
      'Milk/Dairy',
      'Eggs',
      'Fish',
      'Shellfish',
      'Tree Nuts',
      'Peanuts',
      'Wheat',
      'Soy',
      'None'
    ],
    allowMultiple: true
  },
  {
    id: 'diet-1',
    category: 'dietaryPreferences',
    question: 'What are your dietary practices?',
    options: [
      'Vegetarian',
      'Vegan',
      'Gluten-Free',
      'Kosher',
      'Halal',
      'No specific dietary restrictions'
    ],
    allowMultiple: false
  },
  {
    id: 'health-2',
    category: 'healthConcerns',
    question: 'Are you monitoring your intake of any of these nutrients?',
    options: [
      'Sodium (Salt)',
      'Added Sugars',
      'Saturated Fats',
      'Protein',
      'Fiber',
      'Not monitoring specific nutrients'
    ],
    allowMultiple: true
  },
  {
    id: 'health-3',
    category: 'healthConcerns',
    question: 'Do you have any digestive health conditions?',
    options: [
      'Celiac Disease',
      'Inflammatory Bowel Disease (IBD)',
      'Irritable Bowel Syndrome (IBS)',
      'Acid Reflux (GERD)',
      'Lactose Intolerance',
      'None of the above'
    ],
    allowMultiple: true
  },
  {
    id: 'allergies-2',
    category: 'allergies',
    question: 'Do you have any sensitivities to these food additives?',
    options: [
      'Artificial Sweeteners',
      'MSG (Monosodium Glutamate)',
      'Sulfites',
      'Food Colorings',
      'Preservatives',
      'None'
    ],
    allowMultiple: true
  },
  {
    id: 'diet-2',
    category: 'dietaryPreferences',
    question: 'What is your primary goal for food choices?',
    options: [
      'Weight Management',
      'Athletic Performance',
      'Heart Health',
      'Blood Sugar Control',
      'General Wellness',
      'No specific goal'
    ],
    allowMultiple: false
  },
  {
    id: 'health-4',
    category: 'healthConcerns',
    question: 'Are you deficient in or supplementing any of these vitamins/minerals?',
    options: [
      'Vitamin B12',
      'Vitamin D',
      'Iron',
      'Calcium',
      'Omega-3 Fatty Acids',
      'Not aware of any deficiencies'
    ],
    allowMultiple: true
  },
  {
    id: 'diet-3',
    category: 'dietaryPreferences',
    question: 'Which of these describes your meal pattern preferences?',
    options: [
      'Regular 3 meals per day',
      'Small frequent meals (5-6 per day)',
      'Intermittent Fasting',
      'Time-Restricted Eating',
      'No specific pattern'
    ],
    allowMultiple: false
  },
  {
    id: 'health-5',
    category: 'healthConcerns',
    question: 'Do you need to avoid any of these ingredients for medical reasons?',
    options: [
      'Caffeine',
      'Alcohol',
      'Tyramine (found in aged foods)',
      'FODMAPs',
      'Histamine',
      'None of the above'
    ],
    allowMultiple: true
  }
]; 