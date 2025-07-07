export interface BotConfig {
  // Driver Configuration
  geckoDriverPath: string;
  url: string;
  loginUrl: string;
  
  // Login Credentials
  username: string;
  password: string;
  
  // Bot Behavior
  mode: 'like' | 'comment';
  iterations: number;
  scrollDistance: number;
  delayBetweenActions: number;
  handlePopup: boolean;
  
  // Element Selectors
  selectors: {
    loginXpath: string;
    usernameXpath: string;
    passwordXpath: string;
    loginBtnXpath: string;
    popupBtnXpath: string;
    likeBtnCss: string;
    likeBtnXpath: string;
    likeBtnClassname: string;
    commentClassname: string;
  };
}

export interface BotStatus {
  isRunning: boolean;
  currentStep: string;
  progress: number;
  totalIterations: number;
  completedIterations: number;
  errors: number;
  likes: number;
  comments: number;
  startTime?: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

export const DEFAULT_CONFIG: BotConfig = {
  geckoDriverPath: '/Users/administrator/Desktop/Projects/SeleniumProjects/BandLabBot/Driver/geckodriver',
  url: 'https://www.bandlab.com/',
  loginUrl: 'https://www.bandlab.com/feed',
  username: '',
  password: '',
  mode: 'like',
  iterations: 10,
  scrollDistance: 750,
  delayBetweenActions: 1000,
  handlePopup: true,
  selectors: {
    loginXpath: '/html/body/div[1]/site-top-bar/nav/section[2]/ul/li[4]/a',
    usernameXpath: '//*[@id="username"]',
    passwordXpath: '//*[@id="password"]',
    loginBtnXpath: '/html/body/main/div/div/div/div/div/section/form/div[4]/button',
    popupBtnXpath: '/html/body/privacy-banner/div/div[2]/button',
    likeBtnCss: '.row-gap-medium-up-4 > div:nth-child(1) > post-card:nth-child(1) > div:nth-child(1) > post-tile-social:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > like:nth-child(1)',
    likeBtnXpath: '/html/body/main/div/section/div[2]/div[2]/div[3]/div/div[1]/post-card/div/post-tile-social/div/div[1]/span/like',
    likeBtnClassname: 'button-scd',
    commentClassname: 'comment-input'
  }
};