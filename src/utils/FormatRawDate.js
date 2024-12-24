export const FormatRawDate = (cand, time = true) => {
    const rawDate =
        cand?.localCreatedAt ??
        cand?.localContactDate ??
        cand?.localCompletedAt ??
        cand?.localDocDate;
    if (rawDate) {
        const date = new Date(rawDate);
        const locale = navigator.language;
        const formatted = time
            ? new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date)
            : new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);

        return formatted;
    }
    return '';
}
