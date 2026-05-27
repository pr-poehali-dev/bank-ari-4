import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { accounts, transactions, formatCurrency } from '@/data/mockData';

export default function Accounts() {
  const [selectedId, setSelectedId] = useState(accounts[0].id);
  const selected = accounts.find((a) => a.id === selectedId)!;
  const accTx = transactions.filter((t) => t.accountId === selectedId);

  const gradients = {
    blue: 'from-blue-600 to-violet-600',
    gold: 'from-amber-500 to-orange-500',
    green: 'from-emerald-500 to-teal-500',
  };

  const typeLabels = {
    checking: 'Расчётный счёт',
    savings: 'Накопительный',
    deposit: 'Вклад',
  };

  const incomeMonth = accTx.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenseMonth = accTx.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Счета</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Управляйте своими счетами</p>
      </div>

      {/* Accounts list */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {accounts.map((acc) => (
          <button
            key={acc.id}
            onClick={() => setSelectedId(acc.id)}
            className={`text-left rounded-2xl p-5 bg-gradient-to-br ${gradients[acc.color]} border transition-all ${
              selectedId === acc.id
                ? 'border-white/30 scale-[1.02] shadow-lg'
                : 'border-white/10 opacity-70 hover:opacity-90 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-white/70">{typeLabels[acc.type]}</p>
              {selectedId === acc.id && (
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </div>
            <p className="text-xl font-bold font-mono-num text-white">{formatCurrency(acc.balance)}</p>
            <p className="text-xs text-white/60 mt-2">{acc.name}</p>
            <p className="text-xs text-white/40 font-mono mt-0.5">{acc.number.slice(-9)}</p>
          </button>
        ))}
      </div>

      {/* Selected account details */}
      <div className="card-glow rounded-2xl bg-card border border-border p-6 animate-scale-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
            <p className="text-sm text-muted-foreground font-mono mt-0.5">{selected.number}</p>
          </div>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <Icon name="Copy" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-xl bg-secondary">
            <p className="text-xs text-muted-foreground mb-1">Баланс</p>
            <p className="font-bold font-mono-num text-foreground">{formatCurrency(selected.balance)}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-secondary">
            <p className="text-xs text-muted-foreground mb-1">Пополнения</p>
            <p className="font-bold font-mono-num text-green-400">+{formatCurrency(incomeMonth)}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-secondary">
            <p className="text-xs text-muted-foreground mb-1">Списания</p>
            <p className="font-bold font-mono-num text-foreground">−{formatCurrency(expenseMonth)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 btn-gradient text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2">
            <Icon name="ArrowLeftRight" size={16} />
            Перевести
          </button>
          <button className="flex-1 bg-secondary text-foreground text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
            <Icon name="Download" size={16} />
            Реквизиты
          </button>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Операции по счёту
          </h3>
          {accTx.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">Операций пока нет</p>
          ) : (
            <div className="space-y-0 divide-y divide-border rounded-xl overflow-hidden border border-border">
              {accTx.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-base flex-shrink-0">
                    {tx.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                  </div>
                  <p className={`text-sm font-semibold font-mono-num flex-shrink-0 ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
