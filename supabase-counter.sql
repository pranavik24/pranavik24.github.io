create table if not exists public.portfolio_counters (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.portfolio_counters (key, value)
values ('fun_listens', 0)
on conflict (key) do nothing;

alter table public.portfolio_counters enable row level security;

drop policy if exists "Anyone can read portfolio counters" on public.portfolio_counters;
create policy "Anyone can read portfolio counters"
on public.portfolio_counters
for select
to anon
using (true);

create or replace function public.increment_portfolio_counter(counter_key text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  next_value bigint;
begin
  insert into public.portfolio_counters as counters (key, value, updated_at)
  values (counter_key, 1, now())
  on conflict (key)
  do update set
    value = counters.value + 1,
    updated_at = now()
  returning value into next_value;

  return next_value;
end;
$$;

grant execute on function public.increment_portfolio_counter(text) to anon;
