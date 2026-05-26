import React, { useState, useEffect } from 'react';
import { Pickaxe, ChevronRight, Zap, Coins, Users, Star, Menu, X, Gift, Users2, Target, Video, Ticket, Repeat, Smartphone, Apple, Globe, MessageCircle, Send, Youtube, Heart, Info, Copy, Check } from 'lucide-react';
import AdSense from './components/AdSense';

// 다국어 텍스트 데이터
const translations = {
  ko: {
    nav: {
      concept: "Concept",
      features: "Features",
      howToEarn: "How to Earn",
      guide: "Guide"
    },
    hero: {
      badge: "마이크로 비트코인 X 사토시 밈",
      headlinePrefix: "사토시를 채굴하라!",
      description: "복잡한 장비와 전문 지식은 필요 없습니다. 일상 속에서 스마트폰으로 간편하게 채굴하고, 당신의 첫 SATOSHI 밈을 획득하세요.",
      btnStart: "바로 시작하기",
      btnDetails: "자세히 알아보기",
      socialProof: "이미 <b>106,364명</b>이 채굴 중입니다",
      miningSpeed: "채굴 속도",
      myBalance: "내 밸런스",
      appStoreWait: "앱스토어 & 구글플레이 출시 예정",
      inviteCode: "추천(레퍼럴) 코드:",
      copy: "복사",
      copied: "복사 완료!"
    },
    partners: {
      title: "함께하는 생태계",
      miners: "100K+ Miners"
    },
    concept: {
      titleLine1: "비트코인의 철학을",
      titleLine2: "가장 유쾌하게 잇다",
      desc: "마이크로 비트코인(MBC)의 탈중앙화 비전과 인터넷 문화의 상징인 'SATOSHI 밈'이 만났습니다. 우리는 소수의 전유물이었던 암호화폐 채굴을 누구나 즐길 수 있는 재미있는 놀이로 탈바꿈시켰습니다.",
      list1: "투기 목적이 아닌, 참여와 보상의 순수한 즐거움",
      list2: "밈(Meme) 커뮤니티의 폭발적인 확산력",
      list3: "실제 가치로 연결되는 투명한 보상 시스템"
    },
    features: {
      title: "채굴의 패러다임을 바꿉니다",
      desc: "복잡한 설정, 고가의 그래픽 카드, 과도한 전기 요금은 잊으세요. 오직 당신의 스마트폰만 있으면 충분합니다.",
      f1Title: "간편한 모바일 채굴",
      f1Desc: "앱을 켜고 터치 한 번이면 끝! 백그라운드에서 배터리 소모를 최소화하며 자동으로 사토시가 채굴됩니다.",
      f2Title: "다양하게 즐길 수 있는 컨텐츠",
      f2Desc: "쇼츠 부터 미니게임까지 채굴이라는 개념을 바꿀 수 있는 다양한 컨텐츠를 품고 있습니다. 커뮤니티와 함께 하면 우리는 이룰 수 있습니다.",
      f3Title: "강력한 팬덤 커뮤니티",
      f3Desc: "혼자 하는 채굴은 지루합니다. 친구를 초대해 채굴 파워를 높이고, 명예의 전당(Hall of Fame)에 이름을 올리세요."
    },
    earn: {
      title: "다양한 방법으로 Points를 모으세요",
      desc: "단순한 채굴을 넘어 게임과 이벤트를 통해 더 많은 포인트를 획득할 수 있습니다.",
      methods: [
        { 
          title: "기본 채굴", 
          desc: "채굴 파워와 가속도에 따라 지속적인 Points 자동 채굴",
          details: "채굴파워와 광고보기를 통해 채굴 속도를 향상시켜보세요. 24시간 쉬지 않고, Point를 채굴합니다. 최고 10배 가속도를 활성화 시켜 최대의 더 많은 포인트를 모으세요."
        },
        { 
          title: "친구 초대", 
          desc: "추천인 등록 시 즉시 5,000 Points 특별 지급",
          details: "3단계 리퍼럴 시스템으로 친구를 초대하여 같이 채굴하세요. 친구의 또 다른 친구를 데려와서 함께 채굴하면 서로의 채굴파워가 함께 상승합니다.\n\n커뮤니티가 커질수록 우리의 가치는 더 커집니다."
        },
        { 
          title: "타이밍 게임", 
          desc: "정확도에 따라 1~1,000 Points 차등 지급",
          details: "집중~! 집중! 타이밍에 잘 맞춰 정해진 시간에 멈춰보세요.\n\n1000P를 한방에! 잭팟이 기다리고 있습니다."
        },
        { 
          title: "100% 당첨 쿠폰", 
          desc: "꽝 없는 쿠폰! 결과에 따라 1~1,000 Points 랜덤 획득",
          details: "쿠폰 메뉴로 들어가시면 1~1000P의 꽝없는 쿠폰이 있습니다. 게임을 하고, 제휴 채널을 방문하면 쿠폰이 적립됩니다.\n\n쿠폰을 긁으면 당신에게 포인트가 적립된다.\n\n기부를 하세요~ 사토시 기부액 만큼 쿠폰이 쌓입니다."
        },
        { 
          title: "광고 시청", 
          desc: "짧은 영상 시청하고 추가 보상 포인트 획득",
          details: "채굴속도를 올리려면 광고를 시청해주세요. 짧은 광고 한번에 채굴속도가 2배씩 올라갑니다. 10번의 광고시청으로 24시간 동안 채굴파워x10배 상승 효과를 누르세요."
        },
        { 
          title: "럭키 이벤트", 
          desc: "사토시 캐릭터 포획 시 랜덤 보너스 포인트 지급",
          details: "홈화면을 보고 있으면 럭키사토시가 나타납니다. 어서 잡으세요.~\n\n포인트와 쿠폰을 줍니다."
        }
      ],
      exchangeTitle: "1,000 Points 이상 모았다면?",
      exchangeDesc: "모인 포인트는 즉시 사토시밈 토큰으로 교환하여 출금이 가능합니다!",
      btnEco: "토큰 생태계 확인하기",
      btnDetails: "상세보기"
    },
    guide: {
      title: "시작하기는 놀랍도록 쉽습니다",
      desc: "단 3단계면 사토시 마이너가 될 준비가 완료됩니다. 지금 바로 시작하여 얼리버드 보상을 놓치지 마세요.",
      steps: [
        { title: "앱 다운로드 및 가입", desc: "웹앱으로 바로 시작하거나, 곧 출시될 구글 플레이/앱스토어에서 앱을 다운로드하고 이메일로 10초 만에 간편 가입하세요." },
        { title: "원터치 채굴 시작", desc: "메인 화면의 중앙에 위치한 사토시 캐릭터를 탭하여 채굴을 즉시 시작하세요." },
        { title: "보상 획득 및 부스터", desc: "쿠폰을 입력하거나 출석 체크를 통해 가속도(Boost)를 얻고 더 많은 포인트를 수집하세요." }
      ]
    },
    philosophy: {
      title: "우리의 철학과 약속",
      p1: "본 앱은 상당량의 광고가 있습니다. 사용자들의 광고 시청에 대한 보상으로 사토시밈 토큰을 제공해드립니다.",
      p2: "이 앱의 운영주체는 사토시 재단이 아닌 순수 커뮤니티 참여자들입니다. 그들의 사토시밈 토큰에 대한 수요공급을 통제할 수 없는 사람들입니다.",
      p3: "이 앱의 기반은 참여자들의 토큰 기부와 광고 수익을 통해 이 앱은 운영됩니다.",
      p4: "광고수익의 일부는 다시 <strong class='text-orange-400'>SATOSHIMEME 토큰 매입</strong>에 사용될 것이며 이는 전체 사토시밈 네트워크에 큰 힘이 될 것입니다. 매입과정과 방법은 참여자들의 대화와 토론의 결과로 결정되어 질 것입니다.",
      p5: "커뮤니티 모두가 참여하여 만들어진 운영 수입을 토큰의 가치 상승에 사용하자는 것이 이 앱의 기본 철학입니다. 우리 모두 함께 하기를 기대합니다."
    },
    community: {
      title: "커뮤니티와 함께 하기",
      desc: "다양한 채널에서 다른 마이너들과 소통하고 최신 소식을 받아보세요!"
    },
    footer: {
      desc: "마이크로 비트코인 생태계와 함께하는 가장 혁신적이고 즐거운 모바일 채굴 앱. 지금 바로 사토시 밈의 세계로 빠져보세요.",
      disclaimer: "Microbitcoin.org , satoshimemes.com 을 운영하는 주체와 아무런 연관이 없는 순수 커뮤니티 참여자들에 의해 운영되고 있습니다.",
      ecoTitle: "Ecosystem",
      legalTitle: "Legal & Support",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      rights: "All rights reserved."
    }
  },
  en: {
    nav: {
      concept: "Concept",
      features: "Features",
      howToEarn: "How to Earn",
      guide: "Guide"
    },
    hero: {
      badge: "Micro Bitcoin X Satoshi Meme",
      headlinePrefix: "Mine Satoshi!",
      description: "No complex equipment or expertise needed. Mine easily with your smartphone in your daily life and get your first SATOSHI meme.",
      btnStart: "Start Now",
      btnDetails: "Learn More",
      socialProof: "<b>106,364</b> miners already joined",
      miningSpeed: "Mining Rate",
      myBalance: "My Balance",
      appStoreWait: "Coming soon on App Store & Google Play",
      inviteCode: "Referral Code:",
      copy: "Copy",
      copied: "Copied!"
    },
    partners: {
      title: "Our Ecosystem",
      miners: "100K+ Miners"
    },
    concept: {
      titleLine1: "Continuing Bitcoin's Philosophy",
      titleLine2: "in the Most Joyful Way",
      desc: "The decentralized vision of Micro Bitcoin (MBC) meets the 'SATOSHI meme', a symbol of internet culture. We've transformed crypto mining, once exclusive to a few, into a fun game for everyone.",
      list1: "Pure joy of participation and reward, not for speculation",
      list2: "Explosive viral power of Meme communities",
      list3: "Transparent reward system linked to real value"
    },
    features: {
      title: "Changing the Paradigm of Mining",
      desc: "Forget complex setups, expensive GPUs, and high electricity bills. All you need is your smartphone.",
      f1Title: "Easy Mobile Mining",
      f1Desc: "Open the app and tap once! Satoshi is mined automatically in the background, minimizing battery consumption.",
      f2Title: "Diverse Contents to Enjoy",
      f2Desc: "From shorts to mini-games, we embrace various contents that can change the concept of mining. Together with the community, we can achieve it.",
      f3Title: "Strong Fandom Community",
      f3Desc: "Mining alone is boring. Invite friends to increase your mining power and get on the Hall of Fame."
    },
    earn: {
      title: "Earn Points in Various Ways",
      desc: "Beyond simple mining, earn more points through games and events.",
      methods: [
        { 
          title: "Basic Mining", 
          desc: "Continuous automatic Points mining based on your mining power and boost.",
          details: "Improve your mining speed through mining power and watching ads. Mine Points 24/7 without stopping. Activate up to 10x acceleration to collect the maximum amount of points."
        },
        { 
          title: "Invite Friends", 
          desc: "Get 5,000 Points instantly when someone registers you as a referrer.",
          details: "Invite friends to mine together with our 3-tier referral system. Bring your friends' friends to mine together, and everyone's mining power will increase together.\n\nThe larger the community grows, the greater our value becomes."
        },
        { 
          title: "Timing Game", 
          desc: "Earn 1 to 1,000 Points depending on your accuracy.",
          details: "Focus~! Focus! Stop at the exact right time.\n\n1000P in one shot! The jackpot is waiting for you."
        },
        { 
          title: "100% Win Coupon", 
          desc: "No blanks! Get 1 to 1,000 Points randomly based on the result.",
          details: "Go to the coupon menu to find 1~1000P 100% winning coupons. Play games and visit partner channels to earn coupons.\n\nScratch the coupon to earn points.\n\nMake a donation~ Coupons accumulate based on your Satoshi donation amount."
        },
        { 
          title: "Watch Ads", 
          desc: "Watch a short video to earn extra reward points.",
          details: "Watch ads to increase your mining speed. One short ad doubles your mining speed. Watch 10 ads to enjoy a 10x mining power boost for 24 hours."
        },
        { 
          title: "Lucky Event", 
          desc: "Catch the Satoshi character to receive random bonus points.",
          details: "Keep an eye on the home screen and Lucky Satoshi will appear. Catch it quickly!\n\nIt gives you points and coupons."
        }
      ],
      exchangeTitle: "Collected over 1,000 Points?",
      exchangeDesc: "Your points can be immediately exchanged for Satoshi Meme Tokens and withdrawn!",
      btnEco: "Check Token Ecosystem",
      btnDetails: "Details"
    },
    guide: {
      title: "Getting Started is Incredibly Easy",
      desc: "Just 3 steps and you're ready to become a Satoshi Miner. Start right now and don't miss the early bird rewards.",
      steps: [
        { title: "Download App & Sign Up", desc: "Start immediately via the WebApp, or download the app from Google Play/App Store (coming soon) and sign up easily with email in 10 seconds." },
        { title: "Start 1-Tap Mining", desc: "Tap the Satoshi character located in the center of the main screen to start mining instantly." },
        { title: "Get Rewards & Boosters", desc: "Enter coupons or check-in daily to get Boosts and collect more points." }
      ]
    },
    philosophy: {
      title: "Our Philosophy & Promise",
      p1: "This app contains a significant amount of ads. We provide SATOSHI meme tokens as a reward for users watching ads.",
      p2: "The operators of this app are pure community participants, not the Satoshi Foundation. We are individuals who cannot control the supply and demand of SATOSHIMEME tokens.",
      p3: "This app is operated based on token donations from participants and ad revenue.",
      p4: "A portion of the ad revenue will be used to <strong class='text-orange-400'>buy back SATOSHIMEME tokens</strong>, which will be a great strength to the entire network. The buyback process and method will be determined through conversations and discussions among participants.",
      p5: "Using the operational revenue generated by everyone's participation to increase the token's value is the core philosophy of this app. We look forward to all of us joining together."
    },
    community: {
      title: "Join the Community",
      desc: "Communicate with other miners and get the latest news on various channels!"
    },
    footer: {
      desc: "The most innovative and fun mobile mining app with the Micro Bitcoin ecosystem. Dive into the world of Satoshi Memes right now.",
      disclaimer: "It is operated by pure community participants who have no affiliation with the entities operating Microbitcoin.org and satoshimemes.com.",
      ecoTitle: "Ecosystem",
      legalTitle: "Legal & Support",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      rights: "All rights reserved."
    }
  },
  vi: {
    nav: {
      concept: "Khái niệm",
      features: "Tính năng",
      howToEarn: "Cách kiếm điểm",
      guide: "Hướng dẫn"
    },
    hero: {
      badge: "Micro Bitcoin X Satoshi Meme",
      headlinePrefix: "Khai thác Satoshi!",
      description: "Không cần thiết bị phức tạp hay chuyên môn. Khai thác dễ dàng bằng điện thoại thông minh trong cuộc sống hàng ngày và nhận meme SATOSHI đầu tiên của bạn.",
      btnStart: "Bắt đầu ngay",
      btnDetails: "Tìm hiểu thêm",
      socialProof: "Đã có <b>106,364</b> thợ mỏ tham gia",
      miningSpeed: "Tốc độ khai thác",
      myBalance: "Số dư của tôi",
      appStoreWait: "Sắp ra mắt trên App Store & Google Play",
      inviteCode: "Mã giới thiệu:",
      copy: "Sao chép",
      copied: "Đã sao chép!"
    },
    partners: {
      title: "Hệ sinh thái của chúng tôi",
      miners: "100K+ Thợ mỏ"
    },
    concept: {
      titleLine1: "Tiếp nối triết lý của Bitcoin",
      titleLine2: "theo cách thú vị nhất",
      desc: "Tầm nhìn phi tập trung của Micro Bitcoin (MBC) kết hợp với 'meme SATOSHI', biểu tượng của văn hóa internet. Chúng tôi đã biến việc khai thác tiền điện tử, vốn chỉ dành cho một số ít người, thành một trò chơi thú vị cho tất cả mọi người.",
      list1: "Niềm vui thuần túy của sự tham gia và phần thưởng, không vì mục đích đầu cơ",
      list2: "Sức mạnh lan truyền bùng nổ của cộng đồng Meme",
      list3: "Hệ thống phần thưởng minh bạch liên kết với giá trị thực"
    },
    features: {
      title: "Thay đổi mô hình khai thác",
      desc: "Quên đi các thiết lập phức tạp, GPU đắt tiền và hóa đơn tiền điện cao. Tất cả những gì bạn cần là điện thoại thông minh.",
      f1Title: "Khai thác di động dễ dàng",
      f1Desc: "Mở ứng dụng và chạm một lần! Satoshi được khai thác tự động trong nền, giảm thiểu tiêu thụ pin.",
      f2Title: "Nội dung đa dạng để thưởng thức",
      f2Desc: "Từ video ngắn đến trò chơi mini, chúng tôi bao gồm nhiều nội dung khác nhau có thể thay đổi khái niệm khai thác. Cùng với cộng đồng, chúng ta có thể đạt được điều đó.",
      f3Title: "Cộng đồng Fandom mạnh mẽ",
      f3Desc: "Khai thác một mình rất nhàm chán. Mời bạn bè để tăng sức mạnh khai thác của bạn và ghi tên vào Đại sảnh Danh vọng."
    },
    earn: {
      title: "Kiếm điểm bằng nhiều cách",
      desc: "Vượt ra ngoài việc khai thác đơn giản, kiếm thêm điểm thông qua các trò chơi và sự kiện.",
      methods: [
        { 
          title: "Khai thác cơ bản", 
          desc: "Tự động khai thác Điểm liên tục dựa trên sức mạnh và tốc độ khai thác của bạn.",
          details: "Cải thiện tốc độ khai thác của bạn thông qua sức mạnh khai thác và xem quảng cáo. Khai thác Điểm 24/7 không ngừng nghỉ. Kích hoạt tăng tốc lên đến 10 lần để thu thập lượng điểm tối đa."
        },
        { 
          title: "Mời bạn bè", 
          desc: "Nhận ngay 5.000 Điểm khi ai đó đăng ký bạn làm người giới thiệu.",
          details: "Mời bạn bè cùng khai thác với hệ thống giới thiệu 3 cấp của chúng tôi. Mang bạn của bạn bè đến cùng khai thác, và sức mạnh khai thác của mọi người sẽ cùng tăng lên.\n\nCộng đồng càng phát triển, giá trị của chúng ta càng lớn."
        },
        { 
          title: "Trò chơi canh thời gian", 
          desc: "Kiếm từ 1 đến 1.000 Điểm tùy thuộc vào độ chính xác của bạn.",
          details: "Tập trung~! Tập trung! Dừng lại đúng lúc.\n\n1000P trong một lần! Giải độc đắc đang chờ bạn."
        },
        { 
          title: "100% Trúng thưởng", 
          desc: "Không có vé trượt! Nhận ngẫu nhiên từ 1 đến 1.000 Điểm dựa trên kết quả.",
          details: "Vào menu phiếu giảm giá để tìm phiếu trúng thưởng 100% từ 1~1000P. Chơi trò chơi và truy cập các kênh đối tác để kiếm phiếu giảm giá.\n\nCào phiếu để kiếm điểm.\n\nQuyên góp~ Phiếu giảm giá tích lũy dựa trên số tiền quyên góp Satoshi của bạn."
        },
        { 
          title: "Xem quảng cáo", 
          desc: "Xem một video ngắn để kiếm thêm điểm thưởng.",
          details: "Xem quảng cáo để tăng tốc độ khai thác của bạn. Một quảng cáo ngắn nhân đôi tốc độ khai thác. Xem 10 quảng cáo để tận hưởng sức mạnh khai thác gấp 10 lần trong 24 giờ."
        },
        { 
          title: "Sự kiện may mắn", 
          desc: "Bắt nhân vật Satoshi để nhận điểm thưởng ngẫu nhiên.",
          details: "Hãy để mắt đến màn hình chính và Lucky Satoshi sẽ xuất hiện. Bắt nó nhanh lên!\n\nNó mang lại cho bạn điểm và phiếu giảm giá."
        }
      ],
      exchangeTitle: "Đã thu thập hơn 1.000 Điểm?",
      exchangeDesc: "Điểm của bạn có thể được đổi ngay lập tức thành Token Satoshi Meme và rút tiền!",
      btnEco: "Kiểm tra hệ sinh thái Token",
      btnDetails: "Chi tiết"
    },
    guide: {
      title: "Bắt đầu cực kỳ dễ dàng",
      desc: "Chỉ với 3 bước và bạn đã sẵn sàng trở thành Thợ mỏ Satoshi. Bắt đầu ngay bây giờ và đừng bỏ lỡ phần thưởng cho người tham gia sớm.",
      steps: [
        { title: "Tải ứng dụng & Đăng ký", desc: "Bắt đầu ngay qua WebApp hoặc tải ứng dụng từ Google Play/App Store (sắp ra mắt) và đăng ký dễ dàng bằng email trong 10 giây." },
        { title: "Bắt đầu khai thác 1 chạm", desc: "Chạm vào nhân vật Satoshi nằm ở giữa màn hình chính để bắt đầu khai thác ngay lập tức." },
        { title: "Nhận phần thưởng & Tăng tốc", desc: "Nhập phiếu giảm giá hoặc điểm danh hàng ngày để nhận Tăng tốc và thu thập thêm điểm." }
      ]
    },
    philosophy: {
      title: "Triết lý & Lời hứa của chúng tôi",
      p1: "Ứng dụng này chứa một lượng quảng cáo đáng kể. Chúng tôi cung cấp token meme SATOSHI như một phần thưởng cho người dùng xem quảng cáo.",
      p2: "Người điều hành ứng dụng này là những người tham gia cộng đồng thuần túy, không phải Quỹ Satoshi. Chúng tôi là những cá nhân không thể kiểm soát cung và cầu của token SATOSHIMEME.",
      p3: "Ứng dụng này được vận hành dựa trên sự đóng góp token từ những người tham gia và doanh thu quảng cáo.",
      p4: "Một phần doanh thu quảng cáo sẽ được sử dụng để <strong class='text-orange-400'>mua lại token SATOSHIMEME</strong>, điều này sẽ mang lại sức mạnh to lớn cho toàn bộ mạng lưới. Quá trình và phương thức mua lại sẽ được xác định thông qua các cuộc trò chuyện và thảo luận giữa những người tham gia.",
      p5: "Sử dụng doanh thu hoạt động được tạo ra bởi sự tham gia của mọi người để tăng giá trị của token là triết lý cốt lõi của ứng dụng này. Chúng tôi mong muốn tất cả chúng ta cùng tham gia."
    },
    community: {
      title: "Tham gia cộng đồng",
      desc: "Giao tiếp với các thợ mỏ khác và nhận tin tức mới nhất trên nhiều kênh khác nhau!"
    },
    footer: {
      desc: "Ứng dụng khai thác di động sáng tạo và thú vị nhất với hệ sinh thái Micro Bitcoin. Hòa mình vào thế giới của Satoshi Memes ngay bây giờ.",
      disclaimer: "Nó được điều hành bởi những người tham gia cộng đồng thuần túy, những người không có liên kết với các tổ chức điều hành Microbitcoin.org và satoshimemes.com.",
      ecoTitle: "Hệ sinh thái",
      legalTitle: "Pháp lý & Hỗ trợ",
      terms: "Điều khoản dịch vụ",
      privacy: "Chính sách bảo mật",
      contact: "Liên hệ chúng tôi",
      rights: "Đã đăng ký Bản quyền."
    }
  }
};

export default function App() {
  // 브라우저 언어 감지하여 초기 언어 설정
  const getInitialLang = () => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('vi')) return 'vi';
    return 'en'; // 기본값은 영어
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState(getInitialLang()); // 브라우저 언어로 초기화
  const [modalInfo, setModalInfo] = useState<{ title: string; message: string; isOpen: boolean } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const [isKakaoNoticeOpen, setIsKakaoNoticeOpen] = useState(false);
  
  // 현재 접속한 URL에서 레퍼럴 ID(ref)를 전역으로 저장
  const [refId, setRefId] = useState<string | null>(null);

  const handleCopyRef = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const existingRef = urlParams.get('ref');
    if (existingRef) {
      setRefId(existingRef);
    }
  }, []);

  const t = translations[lang];

  const openModal = (title: string, message: string) => {
    setModalInfo({ title, message, isOpen: true });
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  // 언어 토글 함수 (ko -> en -> vi -> ko)
  const toggleLanguage = () => {
    setLang(prev => {
      if (prev === 'ko') return 'en';
      if (prev === 'en') return 'vi';
      return 'ko';
    });
  };

  // 현재 언어 표시 텍스트
  const getLangDisplay = () => {
    if (lang === 'ko') return 'KR';
    if (lang === 'en') return 'EN';
    return 'VN';
  };

  // 카카오톡 인앱 브라우저 감지 (안드로이드/아이폰 분기 처리) - 애드센스 승인을 위해 자동 리다이렉트 제거
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaotalk = userAgent.indexOf('kakaotalk') !== -1;

    if (isKakaotalk) {
      // 자동 리다이렉트 대신 사용자에게 알림 팝업만 표시
      setIsKakaoNoticeOpen(true);
    }
  }, []);

  // 페이지 타이틀 설정
  useEffect(() => {
    document.title = "MINING SATOSHIMEMES ON MBC";
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDescription) {
      metaDescription.setAttribute("content", "일상 속에서 스마트폰으로 간편하게 채굴하고, SATOSHI 밈을 획득하세요.");
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      metaDescription.content = "일상 속에서 스마트폰으로 간편하게 채굴하고, SATOSHI 밈을 획득하세요.";
      document.head.appendChild(metaDescription);
    }
  }, []);

  // 1. 웹앱 팝업으로 열기로 레퍼럴 전달
  const openWebAppPopup = () => {
    const width = 400; 
    const height = 800; 
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    // 웹앱 URL 구성 (ref 값이 있으면 파라미터로 추가)
    const targetUrl = refId 
      ? `https://app.miningsatoshi.com?ref=${refId}` 
      : "https://app.miningsatoshi.com";

    // 인앱 브라우저 (특히 아이폰 카카오톡 등)에서 window.open이 막히는 것을 방지
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/i.test(userAgent);
    const isKakao = userAgent.includes('kakaotalk');
    
    if (isMobile && isKakao) {
      window.location.href = targetUrl;
    } else {
      window.open(
        targetUrl,
        "MiningSatoshiApp",
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`
      );
    }
  };

  // 2. 구글 플레이 스토어로 레퍼럴 전달
  const handleGooglePlayClick = () => {
    const playStoreBase = "https://play.google.com/store/apps/details?id=com.scp.msatoshi";
    const playStoreUrl = refId 
      ? `${playStoreBase}&referrer=${refId}` 
      : playStoreBase;
    
    window.open(playStoreUrl, '_blank');
  };

  // 3. 애플 앱스토어로 레퍼럴 전달
  const handleAppStoreClick = () => {
    if (refId) {
      alert(`앱스토어 이동 (준비중)\n전달할 레퍼럴: ${refId}\n\n실제 연결 시 URL 예시: https://apps.apple.com/app/id12345?ct=${refId}`);
    } else {
      alert(`앱스토어 이동 (준비중)`);
    }
  };

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* 카카오톡 인앱 브라우저 안내 팝업 */}
      {isKakaoNoticeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel max-w-sm w-full p-6 text-center border-orange-500/50 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">더 나은 환경에서 이용하세요</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              카카오톡 인앱 브라우저에서는 일부 기능이 제한될 수 있습니다.<br/>
              <b>우측 상단(⋮)</b> 또는 <b>하단</b>의 메뉴에서 <br/>
              <span className="text-orange-400 font-bold">"다른 브라우저로 열기"</span>를 선택해 주세요.
            </p>
            <button 
              onClick={() => setIsKakaoNoticeOpen(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}

      {/* 커스텀 CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: fit-content;
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .text-gradient {
          background: linear-gradient(to right, #F7931A, #F5D112);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* 네비게이션 헤더 */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0c]/90 backdrop-blur-md py-4 shadow-lg shadow-orange-900/20' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-400 p-[2px] group-hover:scale-105 transition-transform">
              <img src="satoshi-icon.png" alt="Satoshi Logo" className="w-full h-full object-cover rounded-full border-2 border-black" onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=SM'; }} />
            </div>
            <span className="text-sm sm:text-base md:text-xl font-bold tracking-tight text-white">MINING <span className="text-orange-500">SATOSHIMEMES</span> ON MBC</span>
          </div>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
              <a href="#concept" className="hover:text-orange-400 transition-colors">{t.nav.concept}</a>
              <a href="#features" className="hover:text-orange-400 transition-colors">{t.nav.features}</a>
              <a href="#earn-points" className="hover:text-orange-400 transition-colors">{t.nav.howToEarn}</a>
              <a href="#how-it-works" className="hover:text-orange-400 transition-colors">{t.nav.guide}</a>
            </nav>
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-white transition-colors glass-panel px-3 py-1.5 rounded-full w-16 justify-center"
            >
              <Globe size={16} />
              {getLangDisplay()}
            </button>
          </div>

          {/* 모바일 햄버거 & 언어 버튼 */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-white transition-colors w-12 justify-center"
            >
              <Globe size={18} />
              {getLangDisplay()}
            </button>
            <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0f0f13] border-b border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl">
            <a href="#concept" className="text-gray-300 hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.concept}</a>
            <a href="#features" className="text-gray-300 hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.features}</a>
            <a href="#earn-points" className="text-gray-300 hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.howToEarn}</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.guide}</a>
          </div>
        )}
      </header>

      <main>
        {/* 1. 히어로 섹션 */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-orange-400 text-sm font-semibold mb-6">
                  <Zap size={16} className="text-yellow-400" />
                  <span>{t.hero.badge}</span>
                </div>
                {/* 메인 타이틀은 영어 고정, 서브텍스트는 언어설정 적용 */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 break-keep">
                  <span className="text-2xl md:text-4xl block mb-2 text-gray-300">{t.hero.headlinePrefix}</span>
                  <span className="text-gradient uppercase tracking-tight">MINING SATOSHIMEMES<br/>ON MBC</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button onClick={openWebAppPopup} className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]">
                    {t.hero.btnStart} <ChevronRight size={20} />
                  </button>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={handleGooglePlayClick} className="flex-1 sm:flex-none glass-panel text-gray-400 hover:text-white hover:bg-gray-800 px-6 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                      <Smartphone size={18} /> Google Play
                    </button>
                    <button onClick={handleAppStoreClick} className="flex-1 sm:flex-none glass-panel text-gray-400 hover:text-white hover:bg-gray-800 px-6 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                      <Apple size={18} /> App Store
                    </button>
                  </div>
                </div>

                {/* 추천인 코드 클립보드 복사 UI */}
                {refId && (
                  <div className="mt-6 inline-flex relative items-center gap-3 glass-panel px-5 py-3 rounded-2xl border-orange-500/30">
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-gray-400">{t.hero.inviteCode}</span>
                      <span className="text-lg font-bold text-orange-400 font-mono tracking-wider">{refId}</span>
                    </div>
                    <button
                      onClick={handleCopyRef}
                      className="ml-2 bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors flex items-center justify-center text-gray-300 hover:text-white"
                      title={t.hero.copy}
                    >
                      {isCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                    </button>
                    {isCopied && <span className="absolute -top-8 right-2 text-xs text-green-400 font-bold animate-bounce bg-green-900/80 px-3 py-1 rounded-full whitespace-nowrap shadow-lg">{t.hero.copied}</span>}
                  </div>
                )}
                
                {/* 간이 소셜 프루프 */}
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                  <div className="flex -space-x-3">
                    <img src="SD_SATOSHI.png" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}/>
                    <img src="Gemini_Generated_Image_4f0mpd4f0mpd4f0m.png" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}/>
                    <img src="satoshi-icon.png" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}/>
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: t.hero.socialProof}}></span>
                  </div>
                </div>
              </div>

              {/* 히어로 이미지 */}
              <div className="flex-1 w-full max-w-md lg:max-w-none relative animate-float mt-12 lg:mt-0">
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-800 shadow-2xl shadow-orange-900/30 bg-black aspect-[9/16] md:aspect-auto">
                  <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-2xl w-1/3 mx-auto"></div>
                  <img src="apphome.png" alt="App Interface" className="w-full h-full md:h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" onError={(e) => { e.target.style.display = 'none'; }}/>
                </div>
                <div className="absolute -right-2 md:-right-6 top-20 glass-panel p-3 md:p-4 rounded-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-full hidden sm:block">
                      <Pickaxe className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400 font-medium">{t.hero.miningSpeed}</p>
                      <p className="text-sm md:text-lg font-bold text-white">250 Points/hr</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-2 md:-left-6 bottom-32 glass-panel p-3 md:p-4 rounded-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/20 p-2 rounded-full hidden sm:block">
                      <Coins className="text-yellow-400" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400 font-medium">{t.hero.myBalance}</p>
                      <p className="text-sm md:text-lg font-bold text-white text-gradient">190,983</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 파트너 Ticker */}
        <section className="border-y border-gray-800 bg-gray-900/50 py-6 overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
            <h3 className="text-gray-400 font-semibold text-lg flex-shrink-0 z-10 bg-[#0a0a0c] md:bg-transparent pr-4">{t.partners.title}</h3>
            <div className="flex-1 overflow-hidden relative">
              <div className="animate-ticker flex items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Original Items */}
                <a href="https://www.microbitcoin.org/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">M</div>
                  <span className="font-bold text-xl">Micro Bitcoin</span>
                </a>
                <a href="https://satoshimemes.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">S</div>
                  <span className="font-bold text-xl">Satoshi Meme</span>
                </a>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Users size={24} />
                  <span className="font-bold text-xl">{t.partners.miners}</span>
                </div>
                
                {/* Duplicated Items for seamless loop */}
                <a href="https://www.microbitcoin.org/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">M</div>
                  <span className="font-bold text-xl">Micro Bitcoin</span>
                </a>
                <a href="https://satoshimemes.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">S</div>
                  <span className="font-bold text-xl">Satoshi Meme</span>
                </a>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Users size={24} />
                  <span className="font-bold text-xl">{t.partners.miners}</span>
                </div>

                {/* Extra set for very wide screens if needed */}
                <a href="https://www.microbitcoin.org/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">M</div>
                  <span className="font-bold text-xl">Micro Bitcoin</span>
                </a>
                <a href="https://satoshimemes.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 whitespace-nowrap hover:text-orange-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">S</div>
                  <span className="font-bold text-xl">Satoshi Meme</span>
                </a>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Users size={24} />
                  <span className="font-bold text-xl">{t.partners.miners}</span>
                </div>
              </div>
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* 2. 컨셉 소개 */}
        <section id="concept" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-transparent rounded-3xl blur-2xl"></div>
                <img src="사토시밈.png" alt="Satoshi Concept" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover border border-gray-800" onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Concept+Image'; }} />
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight break-keep">
                  {t.concept.titleLine1} <br/><span className="text-orange-500">{t.concept.titleLine2}</span>
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  {t.concept.desc}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-orange-500/20 p-1 rounded-full"><Zap className="text-orange-500" size={16} /></div>
                    <span className="text-gray-300">{t.concept.list1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-orange-500/20 p-1 rounded-full"><Zap className="text-orange-500" size={16} /></div>
                    <span className="text-gray-300">{t.concept.list2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-orange-500/20 p-1 rounded-full"><Zap className="text-orange-500" size={16} /></div>
                    <span className="text-gray-300">{t.concept.list3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 핵심 기능 */}
        <section id="features" className="py-24 bg-[#0d0d12]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 break-keep">{t.features.title}</h2>
              <p className="text-gray-400 text-lg">{t.features.desc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="h-48 w-full rounded-2xl overflow-hidden mb-6 bg-gray-800">
                  <img src="Gemini_Generated_Image_4f0mpd4f0mpd4f0m.png" alt="Feature 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; }}/>
                </div>
                <h3 className="text-2xl font-bold mb-3">{t.features.f1Title}</h3>
                <p className="text-gray-400 leading-relaxed">{t.features.f1Desc}</p>
              </div>

              <div className="glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="h-48 w-full rounded-2xl overflow-hidden mb-6 bg-gray-800 relative">
                  <img src="fun_mine.png" alt="Feature 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; }}/>
                </div>
                <h3 className="text-2xl font-bold mb-3">{t.features.f2Title}</h3>
                <p className="text-gray-400 leading-relaxed">{t.features.f2Desc}</p>
              </div>

              <div className="glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="h-48 w-full rounded-2xl overflow-hidden mb-6 bg-gray-800">
                  <img src="satoshi-icon.png" alt="Feature 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 object-top" onError={(e) => { e.target.style.display = 'none'; }}/>
                </div>
                <h3 className="text-2xl font-bold mb-3">{t.features.f3Title}</h3>
                <p className="text-gray-400 leading-relaxed">{t.features.f3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 중간 광고 영역 */}
        <AdSense 
          client="ca-pub-6917612099433744" 
          slot="9198168516" 
        />

        {/* 포인트 획득 방법 */}
        <section id="earn-points" className="py-24 relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 break-keep" dangerouslySetInnerHTML={{__html: t.earn.title.replace('Points', '<span class="text-orange-500">Points</span>')}}></h2>
              <p className="text-gray-400 text-lg">{t.earn.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.earn.methods.map((method, index) => (
                <div key={index} className="glass-panel p-6 rounded-2xl flex flex-col items-start hover:border-orange-500/50 transition-colors relative group">
                  <div className="w-full flex justify-between items-start mb-4">
                    <div className="bg-gray-800 p-3 rounded-xl">
                      {index === 0 && <Zap className="text-orange-500" size={24} />}
                      {index === 1 && <Users2 className="text-orange-500" size={24} />}
                      {index === 2 && <Target className="text-orange-500" size={24} />}
                      {index === 3 && <Ticket className="text-orange-500" size={24} />}
                      {index === 4 && <Video className="text-orange-500" size={24} />}
                      {index === 5 && <Gift className="text-orange-500" size={24} />}
                    </div>
                    <button 
                      onClick={() => openModal(method.title, method.details)}
                      className="text-xs font-semibold text-gray-400 hover:text-orange-500 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
                    >
                      {t.earn.btnDetails}
                    </button>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">{method.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{method.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 glass-panel rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-orange-500/30">
               <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-500/10 z-0"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 mx-auto bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(247,147,26,0.6)]">
                    <Repeat size={32} className="text-white" />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.earn.exchangeTitle}</h3>
                 <p className="text-xl text-gray-300 mb-8" dangerouslySetInnerHTML={{__html: t.earn.exchangeDesc.replace('사토시밈 토큰으로 교환하여 출금', '<strong class="text-orange-400">사토시밈 토큰으로 교환하여 출금</strong>').replace('Satoshi Meme Tokens and withdrawn', '<strong class="text-orange-400">Satoshi Meme Tokens and withdrawn</strong>')}}></p>
                 <button onClick={openWebAppPopup} className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                    {t.earn.btnEco}
                 </button>
               </div>
            </div>
          </div>
        </section>

        {/* 4. 참여 유도 (Guide) */}
        <section id="how-it-works" className="py-24 bg-[#0d0d12] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 break-keep" dangerouslySetInnerHTML={{__html: t.guide.title.replace('놀랍도록', '<span class="text-orange-500">놀랍도록</span>').replace('Incredibly', '<span class="text-orange-500">Incredibly</span>')}}></h2>
                <p className="text-gray-400 text-lg mb-12">{t.guide.desc}</p>
                
                <div className="space-y-8">
                  {t.guide.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">{index + 1}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-white">{step.title}</h4>
                        <p className="text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                   <button onClick={openWebAppPopup} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                    <ChevronRight size={24} /> {t.hero.btnStart}
                  </button>
                   <button disabled className="glass-panel text-gray-500 px-6 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                     {t.hero.appStoreWait}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-[3rem] blur-2xl opacity-20"></div>
                <img src="Play_Satoshi.png" alt="Play and Mine Satoshi" className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover border border-gray-800 hover:scale-[1.02] transition-transform duration-500" onError={(e) => { e.target.src = 'https://via.placeholder.com/500x600?text=App+Preview'; }}/>
              </div>
            </div>
          </div>
        </section>

        {/* 새 섹션: 철학과 운영 원칙 */}
        <section className="py-20 bg-[#0a0a0c] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border-orange-500/20 relative shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none"></div>
               <div className="flex items-center gap-4 mb-8 relative z-10">
                 <div className="bg-orange-500/20 p-3 rounded-2xl flex-shrink-0">
                   <Heart className="text-orange-500" size={32} />
                 </div>
                 <h2 className="text-2xl md:text-4xl font-bold text-white break-keep">{t.philosophy.title}</h2>
               </div>
               
               <div className="space-y-5 text-gray-300 text-lg leading-relaxed relative z-10">
                 <p className="flex items-start gap-3">
                    <Info className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>{t.philosophy.p1}</span>
                 </p>
                 <p className="flex items-start gap-3">
                    <Info className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>{t.philosophy.p2}</span>
                 </p>
                 <p className="flex items-start gap-3">
                    <Info className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>{t.philosophy.p3}</span>
                 </p>
                 
                 <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500 rounded-r-xl p-6 mt-8 mb-8 shadow-inner">
                    <p className="text-orange-50" dangerouslySetInnerHTML={{__html: t.philosophy.p4}}></p>
                 </div>
                 
                 <p className="text-xl md:text-2xl text-white font-bold text-center mt-8 pt-8 border-t border-white/10">
                    {t.philosophy.p5}
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* 커뮤니티 섹션 */}
        <section className="py-24 bg-[#0d0d12] relative overflow-hidden border-t border-gray-800">
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="container mx-auto px-6 relative z-10 text-center">
             <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 break-keep">{t.community.title}</h2>
             <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">{t.community.desc}</p>
             
             {/* 모달 컴포넌트 */}
             {modalInfo?.isOpen && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
                 <div className="glass-panel p-8 rounded-3xl max-w-md w-full text-center border border-orange-500/30" onClick={e => e.stopPropagation()}>
                    <h3 className="text-2xl font-bold mb-4 text-white">{modalInfo.title}</h3>
                    <p className="text-gray-300 mb-8">{modalInfo.message}</p>
                    <button onClick={closeModal} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold">확인</button>
                 </div>
               </div>
             )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <a href="https://open.kakao.com/o/gslkLiKb" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                   <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                     <MessageCircle size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">카카오톡 환장하겠네</h4>
                     <p className="text-sm text-gray-400">자유로운 소통 공간</p>
                   </div>
                </a>
                
                <a href="https://open.kakao.com/o/gI75m9pe" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                   <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                     <MessageCircle size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">카카오톡 공식 채널</h4>
                     <p className="text-sm text-gray-400">MBC, SAT, KRW 재단</p>
                   </div>
                </a>

                <a href="https://open.kakao.com/o/gCLfIjCh" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                   <div className="bg-[#FAE100] p-3 rounded-xl text-black group-hover:scale-110 transition-transform">
                     <MessageCircle size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">카카오톡 MBC</h4>
                     <p className="text-sm text-gray-400">MBC 홀더 모임</p>
                   </div>
                </a>

                <a href="https://t.me/+887Sr-VpLy4yNmZl" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                   <div className="bg-[#24A1DE] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                     <Send size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">Telegram</h4>
                     <p className="text-sm text-gray-400">글로벌 커뮤니티</p>
                   </div>
                </a>

                <a href="https://www.youtube.com/@MicroBitcoin" target="_blank" rel="noreferrer" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                   <div className="bg-[#FF0000] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                     <Youtube size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">MBC YouTube</h4>
                     <p className="text-sm text-gray-400">공식 영상 채널</p>
                   </div>
                </a>

                <button onClick={() => openModal("MiningSAT YouTube", "현재 채널 공사중입니다. 곧 찾아뵙겠습니다!")} className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group w-full text-left">
                   <div className="bg-[#FF0000] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                     <Youtube size={28} />
                   </div>
                   <div className="text-left">
                     <h4 className="font-bold text-lg">MiningSAT YouTube</h4>
                     <p className="text-sm text-gray-400">공사중 안내</p>
                   </div>
                </button>
             </div>
           </div>
        </section>

        {/* 하단 광고 영역 */}
        <AdSense 
          client="ca-pub-6917612099433744" 
          slot="9198168516" 
        />

      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-gray-900 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-400 p-[2px]">
                  <img src="satoshi-icon.png" alt="Logo" className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}/>
                </div>
                <span className="text-base md:text-xl font-bold tracking-tight text-white">MINING <span className="text-orange-500">SATOSHIMEMES</span> ON MBC</span>
              </div>
              <p className="text-gray-500 mb-2 max-w-sm">
                {t.footer.desc}
              </p>
              <p className="text-xs text-gray-600 max-w-sm mt-4 p-3 bg-white/5 rounded-lg border border-white/10 leading-relaxed">
                <strong className="text-gray-400">Disclaimer:</strong><br/>
                {t.footer.disclaimer}
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.ecoTitle}</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="https://www.microbitcoin.org/" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors">Micro Bitcoin (MBC)</a></li>
                <li><a href="https://satoshimemes.com/" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors">Satoshi Memes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.legalTitle}</h4>
              <ul className="space-y-3 text-gray-500">
                <li><button onClick={() => openModal("Terms of Service", "본 서비스 이용약관은 마이크로 비트코인 생태계의 건전한 운영과 사용자 보호를 목적으로 합니다. 모든 사용자는 본 약관을 준수해야 합니다.")} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => openModal("Privacy Policy", "개인정보 처리방침은 사용자의 소중한 정보를 안전하게 보호하기 위해 수집, 이용, 제공에 관한 사항을 규정합니다. 우리는 사용자의 개인정보를 최우선으로 보호합니다.")} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => openModal("Contact Us", "이메일: jmjeon99@naver.com / 전화번호: 010-5780-6629")} className="hover:text-white transition-colors text-left">Contact Us</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Mining Satoshimemes. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
