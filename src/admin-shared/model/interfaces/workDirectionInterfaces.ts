// Дозволені типи секцій для WorkDirectionCard
export type allowedSections =
  | "title"
  | "paragraph"
  | "list"
  | "budgetCards"
  | "imageList";

// Дозволені типи напрямків роботи
export type allowedTypes =
  | "medicine"
  | "electric"
  | "education"
  | "restoration"
  | "culture";

// Інтерфейс для картки бюджету
export interface BudgetCard {
  id: string; // Унікальний ідентифікатор картки бюджету
  title: string; // Назва картки
  amount: number; // Сума
}

// Інтерфейс для секції в картці
export interface Section {
  id: string; // Унікальний ідентифікатор секції
  sectionType: NonNullable<allowedSections>; // Тип секції (заборонено бути null)
  type: allowedSections; // Тип секції
  content: string | string[] | BudgetCard[]; // Зміст секції
}

// Інтерфейс для напрямку роботи (WorkDirection)
export interface WorkDirection {
  cardTitle: string; // Заголовок картки
  mainImg: string; // Головне зображення картки
  sections: Section[]; // Секції картки
}

// Інтерфейс для роботи з напрямком (IWorkDirection)
export interface IWorkDirection {
  id: string; // Унікальний ідентифікатор напрямку роботи
  ua: WorkDirection; // Контент для української мови
  en: WorkDirection; // Контент для англійської мови
  workDirectionsType: allowedTypes; // Тип напрямку роботи
  isPosted: boolean; // Статус публікації
  response?: string; // (Не обов'язкове) Відповідь
}

// Інтерфейс для роботи з карткою напрямку (IWorkDirectionCard)
export interface IWorkDirectionCard {
  _id: string; // Унікальний ідентифікатор картки
  updatedAt: string; // Дата оновлення картки
  createdAt: string; // Дата створення картки

  workDirectionsType: allowedTypes[]; // Типи напрямків роботи (може бути кілька типів)
  ua: {
    cardTitle: string; // Заголовок картки (для української мови)
    mainImg: string; // Головне зображення картки (для української мови)
    sections: Section[]; // Секції картки (для української мови)
  };
  en: {
    cardTitle: string; // Заголовок картки (для англійської мови)
    mainImg: string; // Головне зображення картки (для англійської мови)
    sections: Section[]; // Секції картки (для англійської мови)
  };
  isPosted: boolean; // Статус публікації
}

// Інтерфейс для запиту оновлення картки напрямку роботи
export interface IWorkDirectionUpdateRequest {
  isPosted: boolean; // Статус публікації
  cardTitle: string; // Заголовок картки
  mainImg: string; // Головне зображення картки
  workDirectionsType: allowedTypes[]; // Типи напрямків роботи
  images: string[]; // Список зображень
  budgetsCards: {
    id?: string; // (Не обов'язкове) Ідентифікатор картки бюджету
    title: string; // Назва картки бюджету
    amount: number; // Сума бюджету
  }[]; // Масив карток бюджету
}

// Інтерфейс для списку напрямків роботи
export interface IWorkDirections {
  workDirections: IWorkDirection[]; // Список напрямків роботи
}

// Інтерфейс для списку карток напрямків роботи
export interface IWorkDirectionCards {
  workDirections: IWorkDirectionCard[]; // Список карток напрямків роботи
}
