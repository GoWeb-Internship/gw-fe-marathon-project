export const urlUpdate = url => {
  if (typeof window !== `undefined` && typeof url !== `undefined`) {
    window.history.pushState({}, '', url);
  }

  return;
};
