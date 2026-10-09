alter table public.reviews alter column status set default 'approved';
update public.reviews set status = 'approved' where status <> 'approved';
