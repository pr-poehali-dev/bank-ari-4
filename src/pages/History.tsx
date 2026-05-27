import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { transactions, accounts, formatCurrency } from '@/data/mockData';

const categories = ['Все', 'Зарплата', 'Рестораны', 'Перевод', 'Супермаркеты', 'Транспорт', 'ЖКХ', 'Подписки', 'Здоровье', 'Одежда', 'Проценты'];

export default function History() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense' | 'transfer'>('all');
  const [filterCategory, setFilterCategory] = useState('Все');
  const [filterAccount, setFilterAccount] = useState('all');

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || tx.type === filterType;
    const matchCat = filterCategory === 'Все' || tx.category === filterCategory;
    const matchAcc = filterAccount === 'all' || tx.accountId === filterAccount;
    return matchSearch && matchType && matchCat && matchAcc;
  });

  const totalIncome = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const typeFilters = [
    { value: 'all', label: 'Все' },
    { value: 'income', label: 'Доходы' },
    { value: 'expense', label: 'Расходы' },
    { value: 'transfer', label: 'Переводы' },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">История операций</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{transactions.length} операций за май 2026</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-glow rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center">
              <Icon name="TrendingUp" size={14} className="text-green-400" />
            </div>
            <p className="text-xs text-muted-foreground">Поступления</p>
          </div>
          <p className="text-xl font-bold font-mono-num text-green-400">+{formatCurrency(totalIncome)}</p>
        </div>
        <div className="card-glow rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
              <Icon name="TrendingDown" size={14} className="text-red-400" />
            </div>
            <p className="text-xs text-muted-foreground">Расходы</p>
          </div>
          <p className="text-xl font-bold font-mono-num text-foreground">−{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск операций..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-2">
        {typeFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filterType === f.value
                ? 'btn-gradient text-white'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Account filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterAccount('all')}
          className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            filterAccount === 'all' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary text-muted-foreground'
          }`}
        >
          Все счета
        </button>
        {accounts.map((acc) => (
          <button
            key={acc.id}
            onClick={() => setFilterAccount(acc.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterAccount === acc.id ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {acc.name}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterCategory === cat ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Transactions list */}
      <div className="card-glow rounded-2xl bg-card border border-border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mb-3 opacity-40" />
            <p className="text-sm">Операции не найдены</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{tx.category}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{tx.date}, {tx.time}</span>
                    {tx.status === 'pending' && (
                      <span className="text-xs bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded">В обработке</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-semibold font-mono-num ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
