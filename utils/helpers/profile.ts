export const formatProfileId = (name: string): string => {
  return name.trim().replace(/\s+/g, "_").toLowerCase();
};
