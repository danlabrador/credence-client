export function formatDate(dateString, format = "Month DD, YYYY") {
  const date = new Date(dateString);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];
  const year = date.getFullYear();

  switch (format) {
    case "Month DD, YYYY":
      return `${month} ${day}, ${year}`;
    case "YYYY-MM-DD":
      const monthNumber = String(monthIndex + 1).padStart(2, "0");
      return `${year}-${monthNumber}-${day}`;
    default:
      return date.toString();
  }
}
