export function formatChatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return date.toLocaleTimeString([], options);
  }

  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], options)}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function getDmRoomName(userId1: string, userId2: string) {
  return `dm:${[userId1, userId2].sort().join(":")}`;
}

export function parseDmRoomName(roomName: string): [string, string] {
  if (!roomName.startsWith("dm:")) {
    throw new Error("Invalid room name");
  }

  // remove the "dm:" prefix
  const withoutPrefix = roomName.slice(3);

  // split by ":"
  const parts = withoutPrefix.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid DM room format");
  }

  return [parts[0], parts[1]];
}
