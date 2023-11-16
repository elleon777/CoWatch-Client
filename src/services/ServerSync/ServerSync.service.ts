import Player from 'video.js/dist/types/player';

export const ServerSyncController = (socket: any) => {
  return {
    setTime(player: Player): void {
      socket.emit('sendTime', player?.currentTime());
    },
    playVideo() {
      socket.emit('playVideo');
    },
    pauseVideo() {
      socket.emit('pauseVideo');
    },
    requestVideo(src: string): void {
      socket.emit('requestVideo', src);
    },
  };
};
