export function formatTimestamp(timestamp) {
  // Convert the timestamp to milliseconds
  const timestampMs = timestamp * 1000;

  // Create a Date object
  const date = new Date(timestampMs);

  // Get the hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes with leading zeros
  // const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours12 = hours % 12 || 12;

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Assemble the formatted date string
  const formattedDate = `${formattedHours12}:${formattedMinutes} ${amOrPm}, ${day} ${month} ${year}`;

  return formattedDate;
}
