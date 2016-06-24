const iconDirectory = "/assets/icons";
const logoDirectory = "/assets/logos";
const stubDirectory = "/assets/stubs";

const ICONS = {
  filter: {
    black: `${iconDirectory}/filter_black.png`
  },
	logos: {
		hacktive: `${logoDirectory}/logo_hacktive.svg`,
		hashrocketFull: `${logoDirectory}/logo_hashrocket.svg`,
		hashrocketIcon: `${logoDirectory}/logo_hr_mark.svg`
	},
  star: {
    black: `${iconDirectory}/star_black.png`,
    gray: `${iconDirectory}/star_gray.png`
  },
  stubs: {
    avatar: `${stubDirectory}/avatar_stub.png`,
    user: `${stubDirectory}/user_stub.png`
  }
};

module.exports = ICONS;
