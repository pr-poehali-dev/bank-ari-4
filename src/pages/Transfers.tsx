import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { accounts, contacts, formatCurrency } from '@/data/mockData';

type Step = 'select' | 'amount' | 'confirm' | 'success';
type TransferType = 'between' | 'contact' | 'phone';

export default function Transfers() {
  const [step, setStep] = useState<Step>('select');
  const [transferType, setTransferType] = useState<TransferType>('between');
  const [fromAccount, setFromAccount] = useState(accounts[0].id);
  const [toAccount, setToAccount] = useState(accounts[1].id);
  const [selectedContact, setSelectedContact] = useState(contacts[0].id);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);

  const from = accounts.find((a) => a.id === fromAccount)!;
  const to = accounts.find((a) => a.id === toAccount);
  const contact = contacts.find((c) => c.id === selectedContact)!;

  const quickAmounts = [1000, 5000, 10000, 25000, 50000];

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep('success');
    }, 1800);
  };

  const reset = () => {
    setStep('select');
    setAmount('');
    setComment('');
    setSending(false);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-scale-in">
        <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center">
          <Icon name="CheckCircle2" size={52} className="text-green-400 animate-pulse-glow" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Перевод выполнен!</h2>
          <p className="text-muted-foreground mt-1">
            {formatCurrency(Number(amount))} отправлены успешно
          </p>
        </div>
        <div className="card-glow rounded-2xl bg-card border border-border p-5 w-full max-w-sm">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Сумма</span>
            <span className="font-semibold font-mono-num text-foreground">{formatCurrency(Number(amount))}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Откуда</span>
            <span className="font-medium text-foreground">{from.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Куда</span>
            <span className="font-medium text-foreground">
              {transferType === 'between' ? to?.name : contact.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Статус</span>
            <span className="text-green-400 font-medium flex items-center gap-1">
              <Icon name="CheckCircle" size={14} /> Выполнен
            </span>
          </div>
        </div>
        <button onClick={reset} className="btn-gradient text-white px-8 py-3 rounded-xl font-medium">
          Новый перевод
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Переводы</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Переводы в реальном времени</p>
      </div>

      {/* Transfer type tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        {([
          { value: 'between', label: 'Между счетами', icon: 'ArrowLeftRight' },
          { value: 'contact', label: 'Контакту', icon: 'Users' },
          { value: 'phone', label: 'По номеру', icon: 'Phone' },
        ] as const).map((t) => (
          <button
            key={t.value}
            onClick={() => setTransferType(t.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
              transferType === t.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            <Icon name={t.icon} size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* From account */}
      <div className="card-glow rounded-2xl bg-card border border-border p-5 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Откуда</p>
          <div className="space-y-2">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setFromAccount(acc.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  fromAccount === acc.id
                    ? 'border-primary/50 bg-primary/8'
                    : 'border-border hover:border-border/80 bg-secondary/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  fromAccount === acc.id ? 'btn-gradient' : 'bg-secondary'
                }`}>
                  <Icon name="Wallet" size={14} className={fromAccount === acc.id ? 'text-white' : 'text-muted-foreground'} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{acc.name}</p>
                  <p className="text-xs text-muted-foreground font-mono-num">{formatCurrency(acc.balance)}</p>
                </div>
                {fromAccount === acc.id && <Icon name="Check" size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* Animated divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="ArrowDown" size={14} className="text-muted-foreground" />
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* To */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Куда</p>

          {transferType === 'between' && (
            <div className="space-y-2">
              {accounts.filter((a) => a.id !== fromAccount).map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setToAccount(acc.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    toAccount === acc.id
                      ? 'border-primary/50 bg-primary/8'
                      : 'border-border hover:border-border/80 bg-secondary/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    toAccount === acc.id ? 'btn-gradient' : 'bg-secondary'
                  }`}>
                    <Icon name="Wallet" size={14} className={toAccount === acc.id ? 'text-white' : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{acc.name}</p>
                    <p className="text-xs text-muted-foreground font-mono-num">{formatCurrency(acc.balance)}</p>
                  </div>
                  {toAccount === acc.id && <Icon name="Check" size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          )}

          {transferType === 'contact' && (
            <div className="space-y-2">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedContact(c.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedContact === c.id
                      ? 'border-primary/50 bg-primary/8'
                      : 'border-border hover:border-border/80 bg-secondary/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-bold">
                    {c.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.bank} · {c.phone}</p>
                  </div>
                  {selectedContact === c.id && <Icon name="Check" size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          )}

          {transferType === 'phone' && (
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="card-glow rounded-2xl bg-card border border-border p-5 space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Сумма перевода</p>
        <div className="relative">
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-4xl font-bold font-mono-num text-foreground placeholder:text-muted-foreground/30 focus:outline-none pr-16"
          />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">₽</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {quickAmounts.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(String(q))}
              className="px-3 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {q.toLocaleString('ru')} ₽
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Комментарий (необязательно)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!amount || Number(amount) <= 0 || sending}
        className="w-full btn-gradient text-white py-4 rounded-2xl font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Icon name="Send" size={18} />
            {amount ? `Отправить ${formatCurrency(Number(amount))}` : 'Введите сумму'}
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Переводы выполняются мгновенно · Без комиссии
      </p>
    </div>
  );
}
