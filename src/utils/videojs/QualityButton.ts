import videojs from 'video.js';

const MenuButton = videojs.getComponent('MenuButton') as any;
const MenuItem = videojs.getComponent('MenuItem') as any;

export class QualityButton extends MenuButton {
  options_: any;
  createItems() {
    const player = this.player();
    return this.options_.myItems.map(
      (source: { type: any; size: any; src: any }, index: number) => {
        const item = new MenuItem(player, { label: source.size });
        if (index === 0) {
          item.addClass('vjs-selected');
        }
        item.handleClick = function () {
          item.parentComponent_.children().forEach((menuItem: any) => menuItem.removeClass('vjs-selected'));
          item.addClass('vjs-selected');
          player.src(source);
        };
        return item;
      },
    );
  }
}
