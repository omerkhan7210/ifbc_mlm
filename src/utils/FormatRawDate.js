export const FormatRawDate = (cand, time = true) => {
    const rawDate = cand?.docDate
        ? cand?.docDate
        : cand?.createdAt
          ? cand?.createdAt
          : cand?.contactDate
    if (rawDate) {
        const date = new Date(rawDate)
        const formatted = time
            ? new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  // second: "2-digit",
              }).format(date)
            : new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              }).format(date)

        return formatted
    }
    return ''
}
