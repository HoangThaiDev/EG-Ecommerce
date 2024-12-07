export default function convertDate(value) {
  const isoString = value;
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
