export interface Nutrition {
  title: string;
  amount: string;
  indented: boolean;
  percentOfDailyNeeds: number;
}

export interface MainMacros {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
}

export interface RecipeNutritionResponse extends MainMacros {
  bad: Nutrition[];
  good: Nutrition[];
  expires: number;
  isStale: boolean;
}

export interface Equipment {
  id: number;
  image: string;
  name: string;
  temperature?: {
    number: number;
    unit: string;
  };
}

export interface Ingredient {
  id: number;
  image: string;
  name: string;
}

export interface InstructionStep {
  number: number;
  step: string;
  equipment?: Equipment[];
  ingredients: Ingredient[];
}

export interface InstructionsResponse {
  name: string;
  steps: InstructionStep[];
}

export interface RecipeInfo {
  id: number;
  image: string;
  imagetype: string;
  title: string;
}

export interface RecipeSearchResponse {
  number: number;
  offset: number;
  results: RecipeInfo[];
  totalResults: number;
}
