alter table public.consultation_requests
    drop constraint consultation_requests_service_type_check;

alter table public.consultation_requests
    add constraint consultation_requests_service_type_check
    check (service_type in (
        'Security services',
        'Housekeeping',
        'Gardening',
        'Labour & manpower',
        'Other requests'
    ));
