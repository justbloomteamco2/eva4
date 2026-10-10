alter table public.consultation_requests
    add column request_details text
    check (request_details is null or char_length(request_details) <= 1000);
