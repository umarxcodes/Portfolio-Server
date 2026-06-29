const WORDS_PER_MINUTE = 200;

const calculateReadingTime = (content) => {
  const words = String(content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export { calculateReadingTime };
