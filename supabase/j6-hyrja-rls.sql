-- J6: hyrja (Supabase Auth) dhe RLS për LearnUp

-- A. Mbyll derën: hiq tabelën e vjetër të provës nga java 5 (dhe policy-të e saj)
drop table if exists public.lessons;

-- C. Tabela e lëndëve; pronari_id e vendos serveri (ai që krijon rreshtin)
create table if not exists public.lendet (
  id bigint primary key generated always as identity,
  emri text not null,
  pronari_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  krijuar_me timestamptz not null default now()
);

-- RLS ndezur: pa policy, askush nuk sheh asgjë
alter table public.lendet enable row level security;

-- Anon (pa hyrë) nuk ka asnjë qasje; vetëm authenticated (me llogari)
revoke all on public.lendet from anon;
grant select, insert, update on public.lendet to authenticated;

-- Lexim: vetëm rreshtat e mi
create policy "lendet: lexo të vetat"
  on public.lendet for select to authenticated
  using (pronari_id = (select auth.uid()));

-- Shtim: mund të shtoj vetëm rresht me pronar veten
create policy "lendet: shto të vetat"
  on public.lendet for insert to authenticated
  with check (pronari_id = (select auth.uid()));

-- Ndryshim: vetëm rreshtat e mi, dhe nuk mund t'i bëj të dikujt tjetër
create policy "lendet: ndrysho të vetat"
  on public.lendet for update to authenticated
  using (pronari_id = (select auth.uid()))
  with check (pronari_id = (select auth.uid()));
