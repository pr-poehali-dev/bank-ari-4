export interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  currency: string;
  type: 'checking' | 'savings' | 'deposit';
  color: 'blue' | 'gold' | 'green';
}

export interface Card {
  id: string;
  accountId: string;
  name: string;
  number: string;
  holder: string;
  expiry: string;
  type: 'visa' | 'mastercard' | 'mir';
  tier: 'standard' | 'gold' | 'premium';
  frozen: boolean;
  limit: number;
  spent: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  counterpart?: string;
  icon: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  bank: string;
}

export const currentUser = {
  id: 'u1',
  name: 'Лёха',
  phone: '+7 (999) 123-45-67',
  email: 'lyokha@mail.ru',
  avatar: 'Лё',
  memberSince: 'Март 2021',
  status: 'Стандарт',
};

export const accounts: Account[] = [];

export const cards: Card[] = [
  {
    id: 'card1',
    accountId: 'acc1',
    name: 'Ари Premium',
    number: '4276 **** **** 8821',
    holder: 'LYOKHA',
    expiry: '09/28',
    type: 'visa',
    tier: 'premium',
    frozen: false,
    limit: 100_000,
    spent: 34_250,
  },
  {
    id: 'card2',
    accountId: 'acc2',
    name: 'Ари Gold',
    number: '5368 **** **** 4417',
    holder: 'LYOKHA',
    expiry: '03/27',
    type: 'mastercard',
    tier: 'gold',
    frozen: false,
    limit: 200_000,
    spent: 89_000,
  },
  {
    id: 'card3',
    accountId: 'acc1',
    name: 'Ари МИР',
    number: '2202 **** **** 7730',
    holder: 'LYOKHA',
    expiry: '11/26',
    type: 'mir',
    tier: 'standard',
    frozen: true,
    limit: 50_000,
    spent: 0,
  },
];

export const transactions: Transaction[] = [
  {
    id: 'tx1',
    accountId: 'acc1',
    type: 'income',
    category: 'Зарплата',
    description: 'ООО «ТехСофт»',
    amount: 185_000,
    currency: 'RUB',
    date: '27 мая',
    time: '09:00',
    status: 'completed',
    icon: '💼',
  },
  {
    id: 'tx2',
    accountId: 'acc1',
    type: 'expense',
    category: 'Рестораны',
    description: 'Кафе «Дом»',
    amount: -1_850,
    currency: 'RUB',
    date: '26 мая',
    time: '19:34',
    status: 'completed',
    icon: '🍽️',
  },
  {
    id: 'tx3',
    accountId: 'acc1',
    type: 'transfer',
    category: 'Перевод',
    description: 'Михаил Петров',
    amount: -15_000,
    currency: 'RUB',
    date: '26 мая',
    time: '14:20',
    status: 'completed',
    counterpart: 'Михаил Петров',
    icon: '↗️',
  },
  {
    id: 'tx4',
    accountId: 'acc1',
    type: 'expense',
    category: 'Супермаркеты',
    description: 'Пятёрочка',
    amount: -3_420,
    currency: 'RUB',
    date: '25 мая',
    time: '18:11',
    status: 'completed',
    icon: '🛒',
  },
  {
    id: 'tx5',
    accountId: 'acc1',
    type: 'expense',
    category: 'Транспорт',
    description: 'Яндекс.Такси',
    amount: -680,
    currency: 'RUB',
    date: '25 мая',
    time: '11:05',
    status: 'completed',
    icon: '🚕',
  },
  {
    id: 'tx6',
    accountId: 'acc2',
    type: 'income',
    category: 'Проценты',
    description: 'Начисление %% по накопительному',
    amount: 5_480,
    currency: 'RUB',
    date: '24 мая',
    time: '08:00',
    status: 'completed',
    icon: '📈',
  },
  {
    id: 'tx7',
    accountId: 'acc1',
    type: 'expense',
    category: 'ЖКХ',
    description: 'Квартплата — май',
    amount: -8_900,
    currency: 'RUB',
    date: '23 мая',
    time: '10:00',
    status: 'completed',
    icon: '🏠',
  },
  {
    id: 'tx8',
    accountId: 'acc1',
    type: 'income',
    category: 'Перевод',
    description: 'Анна Смирнова',
    amount: 25_000,
    currency: 'RUB',
    date: '22 мая',
    time: '16:48',
    status: 'completed',
    counterpart: 'Анна Смирнова',
    icon: '↙️',
  },
  {
    id: 'tx9',
    accountId: 'acc1',
    type: 'expense',
    category: 'Подписки',
    description: 'Яндекс Плюс',
    amount: -299,
    currency: 'RUB',
    date: '21 мая',
    time: '00:01',
    status: 'completed',
    icon: '🎬',
  },
  {
    id: 'tx10',
    accountId: 'acc1',
    type: 'transfer',
    category: 'Перевод',
    description: 'На накопительный счёт',
    amount: -50_000,
    currency: 'RUB',
    date: '20 мая',
    time: '12:00',
    status: 'completed',
    icon: '🔄',
  },
  {
    id: 'tx11',
    accountId: 'acc1',
    type: 'expense',
    category: 'Здоровье',
    description: 'Аптека «36.6»',
    amount: -1_240,
    currency: 'RUB',
    date: '19 мая',
    time: '17:30',
    status: 'completed',
    icon: '💊',
  },
  {
    id: 'tx12',
    accountId: 'acc1',
    type: 'expense',
    category: 'Одежда',
    description: 'Zara — ТЦ Мега',
    amount: -7_600,
    currency: 'RUB',
    date: '18 мая',
    time: '15:22',
    status: 'completed',
    icon: '👕',
  },
];

export const contacts: Contact[] = [
  { id: 'c1', name: 'Михаил Петров', phone: '+7 (916) 234-56-78', avatar: 'МП', bank: 'Банк Ари' },
  { id: 'c2', name: 'Анна Смирнова', phone: '+7 (903) 345-67-89', avatar: 'АС', bank: 'Банк Ари' },
  { id: 'c3', name: 'Дмитрий Орлов', phone: '+7 (925) 456-78-90', avatar: 'ДО', bank: 'Сбербанк' },
  { id: 'c4', name: 'Ольга Соколова', phone: '+7 (977) 567-89-01', avatar: 'ОС', bank: 'ВТБ' },
  { id: 'c5', name: 'Иван Козлов', phone: '+7 (965) 678-90-12', avatar: 'ИК', bank: 'Банк Ари' },
];

export const formatCurrency = (amount: number, currency = 'RUB') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
};

export const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);