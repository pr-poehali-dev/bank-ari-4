import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cards, accounts, formatCurrency } from '@/data/mockData';

export default function Cards() {
  const [selectedId, setSelectedId] = useState(cards[0].id);
  const selected = cards.find((c) => c.id === selectedId)!;
  const account = accounts.find((a) => a.id === selected.accountId)!;

  const tierGradients = {
    premium: 'from-blue-700 via-violet-700 to-purple-800',
    gold: 'from-amber-600 via-yellow-600 to-orange-600',
    standard: 'from-slate-700 via-slate-600 to-slate-700',
  };

  const tierLabels = {
    premium: 'Premium',
    gold: 'Gold',
    standard: 'Standard',
  };

  const typeIcons = {
    visa: 'VISA',
    mastercard: 'MC',
    mir: 'МИР',
  };

  const spentPct = Math.round((selected.spent / selected.limit) * 100);

  const cardActions = [
    { label: 'Реквизиты', icon: 'Eye' },
    { label: selected.frozen ? 'Разморозить' : 'Заморозить', icon: selected.frozen ? 'Unlock' : 'Lock' },
    { label: 'Лимиты', icon: 'SlidersHorizontal' },
    { label: 'Управление', icon: 'Settings2' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Карты</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Управляйте банковскими картами</p>
      </div>

      {/* Card selector */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedId(card.id)}
            className={`flex-shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-all ${
              selectedId === card.id
                ? 'btn-gradient text-white'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {card.name}
            {card.frozen && <span className="ml-2 text-xs opacity-70">❄️</span>}
          </button>
        ))}
        <button className="flex-shrink-0 rounded-2xl px-4 py-2 text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 border border-dashed border-border">
          <Icon name="Plus" size={14} /> Выпустить
        </button>
      </div>

      {/* Visual card */}
      <div className="flex justify-center">
        <div
          className={`relative w-full max-w-sm h-48 rounded-3xl bg-gradient-to-br ${tierGradients[selected.tier]} p-6 shadow-2xl animate-scale-in overflow-hidden`}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

          {selected.frozen && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
              <div className="text-center">
                <Icon name="Lock" size={32} className="text-white mx-auto mb-2" />
                <p className="text-white font-semibold">Карта заморожена</p>
              </div>
            </div>
          )}

          <div className="relative z-[5] flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs">Банк Ари 4</p>
                <p className="text-white font-bold text-sm mt-0.5">{tierLabels[selected.tier]}</p>
              </div>
              <span className="text-white font-bold text-sm bg-white/10 px-2 py-0.5 rounded">
                {typeIcons[selected.type]}
              </span>
            </div>

            <div>
              <p className="text-white font-mono-num tracking-widest text-base">{selected.number}</p>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-white/50 text-xs">Держатель</p>
                  <p className="text-white text-sm font-medium">{selected.holder}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs">Срок</p>
                  <p className="text-white text-sm font-medium">{selected.expiry}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spend limit */}
      <div className="card-glow rounded-2xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Расходы по карте</p>
          <p className="text-xs text-muted-foreground">В этом месяце</p>
        </div>
        <div className="flex items-end justify-between mb-2">
          <p className="text-2xl font-bold font-mono-num text-foreground">{formatCurrency(selected.spent)}</p>
          <p className="text-sm text-muted-foreground">из {formatCurrency(selected.limit)}</p>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              spentPct > 80
                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                : 'bg-gradient-to-r from-blue-500 to-violet-500'
            }`}
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{spentPct}% лимита использовано</p>
      </div>

      {/* Linked account */}
      <div className="card-glow rounded-2xl bg-card border border-border p-5">
        <p className="text-sm font-semibold text-foreground mb-3">Привязанный счёт</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
            <Icon name="Wallet" size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{account.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{account.number.slice(-9)}</p>
          </div>
          <p className="ml-auto font-semibold font-mono-num text-foreground">{formatCurrency(account.balance)}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3">
        {cardActions.map((action) => (
          <button
            key={action.label}
            className="card-glow flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:bg-secondary transition-colors"
          >
            <Icon name={action.icon} size={20} className="text-primary" />
            <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
