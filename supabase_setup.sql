-- Rode no Supabase: SQL Editor > New query > Run

create table if not exists public.inscricoes (
    id         bigint generated always as identity primary key,
    nome       text not null,
    email      text not null,
    curso      text not null,
    created_at timestamptz not null default now()
);

-- O Supabase liga o RLS por padrão; sem uma policy, TODO insert é bloqueado.
alter table public.inscricoes enable row level security;

drop policy if exists "Permitir insert anonimo" on public.inscricoes;
create policy "Permitir insert anonimo"
    on public.inscricoes
    for insert
    to anon
    with check (true);
