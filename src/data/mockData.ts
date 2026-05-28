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
    description: 'Зарплата',
    amount: 1_000_000,
    currency: 'RUB',
    date: '28 мая',
    time: '09:00',
    status: 'completed',
    icon: '💼',
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