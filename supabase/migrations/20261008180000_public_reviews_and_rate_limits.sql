create table if not exists public.reviews (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 120),
    role text not null default 'Verified client' check (char_length(role) between 1 and 120),
    quote text not null check (char_length(quote) between 1 and 220),
    rating smallint not null check (rating between 1 and 5),
    service text not null check (service in ('Security services', 'Housekeeping', 'Gardening', 'Labour & manpower')),
    status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
    created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
revoke all on table public.reviews from anon, authenticated;
grant select, insert on table public.reviews to service_role;

insert into public.reviews (id, name, role, quote, rating, service, status, created_at)
values
    ('00000000-0000-4000-8000-000000000001', 'Ritika Sharma', 'Operations Lead, Palm Grove Residences', 'Spartan gave our premises a calmer, safer environment from day one. Their team is disciplined, responsive, and deeply professional.', 5, 'Security services', 'approved', now() - interval '30 days'),
    ('00000000-0000-4000-8000-000000000002', 'Arjun Rao', 'Facilities Manager, Greenline Offices', 'The crew was dependable, well-trained, and proactive. They helped raise service standards without disrupting our operations.', 5, 'Housekeeping', 'approved', now() - interval '90 days'),
    ('00000000-0000-4000-8000-000000000003', 'Meera Nair', 'Resident Welfare Association', 'We needed a reliable partner for security and upkeep. Spartan delivered consistency, trust, and visible professionalism.', 5, 'Security services', 'approved', now() - interval '180 days')
on conflict (id) do nothing;

create table if not exists public.consultation_requests (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 120),
    email text not null check (char_length(email) between 3 and 254),
    phone text not null check (char_length(phone) between 8 and 24),
    service_type text not null check (service_type in ('Security services', 'Housekeeping', 'Gardening', 'Labour & manpower')),
    notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
    created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;
revoke all on table public.consultation_requests from anon, authenticated;
grant select, insert, update on table public.consultation_requests to service_role;

create table if not exists public.public_submission_limits (
    bucket text not null check (bucket in ('consultations', 'reviews')),
    key_hash text not null check (key_hash ~ '^[0-9a-f]{64}$'),
    window_started_at timestamptz not null,
    request_count integer not null check (request_count > 0),
    primary key (bucket, key_hash)
);

alter table public.public_submission_limits enable row level security;
revoke all on table public.public_submission_limits from anon, authenticated;
grant select, insert, update, delete on table public.public_submission_limits to service_role;

create or replace function public.check_public_submission_limit(
    p_bucket text,
    p_key_hash text,
    p_limit integer,
    p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
    current_count integer;
begin
    if p_bucket not in ('consultations', 'reviews')
       or p_key_hash !~ '^[0-9a-f]{64}$'
       or p_limit < 1
       or p_window_seconds < 1 then
        raise exception 'Invalid rate-limit request';
    end if;

    insert into public.public_submission_limits as limits (bucket, key_hash, window_started_at, request_count)
    values (p_bucket, p_key_hash, now(), 1)
    on conflict (bucket, key_hash) do update
    set window_started_at = case
            when limits.window_started_at + make_interval(secs => p_window_seconds) <= now() then now()
            else limits.window_started_at
        end,
        request_count = case
            when limits.window_started_at + make_interval(secs => p_window_seconds) <= now() then 1
            else least(limits.request_count + 1, p_limit + 1)
        end
    returning request_count into current_count;

    return current_count <= p_limit;
end;
$$;

revoke all on function public.check_public_submission_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_public_submission_limit(text, text, integer, integer) to service_role;
