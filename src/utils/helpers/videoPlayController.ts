export const createVideoPlayController = (player: any) => {
  let called = false;
  return {
    play: () => {
      if (!called) {
        player.load();
        player.one('canplay', () => {
          player.play();
        });
      }
    },
    reInit: () => {
      called = true;
    },
  };
};
