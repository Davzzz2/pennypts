const _0x4bf034=_0x18a3;(function(_0x16d8c3,_0x1676a7){const _0x22503c=_0x18a3,_0x339866=_0x16d8c3();while(!![]){try{const _0x210189=-parseInt(_0x22503c(0x1f2))/0x1*(-parseInt(_0x22503c(0x217))/0x2)+parseInt(_0x22503c(0x1f8))/0x3*(-parseInt(_0x22503c(0x216))/0x4)+-parseInt(_0x22503c(0x206))/0x5+-parseInt(_0x22503c(0x1e8))/0x6+parseInt(_0x22503c(0x1ff))/0x7+-parseInt(_0x22503c(0x20a))/0x8+parseInt(_0x22503c(0x210))/0x9;if(_0x210189===_0x1676a7)break;else _0x339866['push'](_0x339866['shift']());}catch(_0x1eccb5){_0x339866['push'](_0x339866['shift']());}}}(_0x10d1,0x6085a));const CSV_URL=_0x4bf034(0x21c),prizesUnder75k={0x1:0x19,0x2:0x14,0x3:0xf,0x4:0xa,0x5:0x5,0x6:0x1,0x7:0x1,0x8:0x1,0x9:0x1,0xa:0x1},prizesOver75k={0x1:0x1e,0x2:27.5,0x3:0x12,0x4:0xa,0x5:0x5,0x6:0x1,0x7:0x1,0x8:0x1,0x9:0x1,0xa:0x1};let leaderboardStartDate=new Date(_0x4bf034(0x21b)),leaderboardEndDate=new Date(leaderboardStartDate);leaderboardEndDate[_0x4bf034(0x1e7)](leaderboardStartDate[_0x4bf034(0x202)]()+0x7);function updateCountdown(){const _0x56304c=_0x4bf034,_0x155914=document[_0x56304c(0x1e5)](_0x56304c(0x215));if(!_0x155914||!leaderboardEndDate)return;const _0x5480e0=new Date(),_0x4fb7f4=leaderboardEndDate-_0x5480e0;console['log'](_0x56304c(0x1f0),_0x5480e0),console['log'](_0x56304c(0x20c),leaderboardEndDate),console[_0x56304c(0x220)](_0x56304c(0x20b),_0x4fb7f4);if(_0x4fb7f4<=0x0)leaderboardStartDate[_0x56304c(0x1e7)](leaderboardStartDate['getDate']()+0x7),leaderboardEndDate[_0x56304c(0x1e7)](leaderboardEndDate[_0x56304c(0x202)]()+0x7),updateLeaderboard(),_0x155914['innerHTML']=_0x56304c(0x1f6),updateCountdown();else{const _0x262a76=Math['floor'](_0x4fb7f4/(0x3e8*0x3c*0x3c*0x18)),_0x245c65=Math[_0x56304c(0x1fa)](_0x4fb7f4%(0x3e8*0x3c*0x3c*0x18)/(0x3e8*0x3c*0x3c)),_0x4d8d6d=Math[_0x56304c(0x1fa)](_0x4fb7f4%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x497c37=Math[_0x56304c(0x1fa)](_0x4fb7f4%(0x3e8*0x3c)/0x3e8);_0x155914['innerHTML']=_0x56304c(0x201)+_0x262a76+'d\x20'+_0x245c65+'h\x20'+_0x4d8d6d+'m\x20'+_0x497c37+_0x56304c(0x219);}}async function fetchCSVData(_0x18fcd0){const _0x3b5876=_0x4bf034;try{console[_0x3b5876(0x220)](_0x3b5876(0x205));const _0x3f9cb8=await fetch(_0x18fcd0);if(!_0x3f9cb8['ok'])return console[_0x3b5876(0x1f5)](_0x3b5876(0x1e2),_0x3f9cb8['status'],_0x3f9cb8[_0x3b5876(0x1fd)]),[];const _0x5f683a=await _0x3f9cb8[_0x3b5876(0x1ec)]();return console[_0x3b5876(0x220)](_0x3b5876(0x1fb),_0x5f683a),parseCSV(_0x5f683a);}catch(_0x40959f){return console[_0x3b5876(0x1f5)](_0x3b5876(0x21a),_0x40959f),[];}}function parseCSV(_0x1c01d6){const _0x1208b9=_0x4bf034,_0x152129=_0x1c01d6[_0x1208b9(0x20e)]('\x0a')['slice'](0x1);return console[_0x1208b9(0x220)](_0x1208b9(0x21f),_0x152129),_0x152129['map'](_0x37395e=>{const _0x28808b=_0x1208b9,[_0x430d8a,_0x4aecd2,_0x466a0a,_0xe6b40c,_0x160b2b,_0x585ab3,_0x54c326]=_0x37395e[_0x28808b(0x20e)](',');if(!_0x430d8a||!_0x466a0a||!_0xe6b40c||!_0x160b2b||!_0x585ab3)return null;return{'affiliate_name':_0x430d8a,'campaign_code':_0x4aecd2,'user_name':_0x466a0a,'wagered':parseFloat(_0xe6b40c)||0x0,'rank':parseInt(_0x160b2b)||0x0,'start_date_utc':_0x585ab3,'end_date_utc':_0x54c326};})[_0x1208b9(0x1f9)](_0x431be2=>_0x431be2!==null);}async function updateLeaderboard(){const _0x216bc8=_0x4bf034;try{const _0x2c8acf=await fetchCSVData(CSV_URL);console[_0x216bc8(0x220)](_0x216bc8(0x214),_0x2c8acf);const _0x426c67=_0x2c8acf[_0x216bc8(0x20d)]((_0x1062cf,_0x2bca37)=>_0x1062cf['rank']-_0x2bca37[_0x216bc8(0x1e3)]);_0x426c67[_0x216bc8(0x1ef)]>0x0&&(populateTopRanks(_0x426c67),populateLeaderboard(_0x426c67));}catch(_0x1a0811){console['error'](_0x216bc8(0x221),_0x1a0811);}}function populateTopRanks(_0x342d58){const _0x254bec=_0x4bf034,_0x3396f2=_0x342d58[_0x254bec(0x1f4)](0x0,0x3);_0x3396f2[_0x254bec(0x200)]((_0x1cc4cb,_0x21f4f0)=>{const _0x2bd6bc=_0x254bec,_0x498c97=_0x21f4f0+0x1;let _0x38fa23='$'+getPrize(_0x1cc4cb[_0x2bd6bc(0x21e)],_0x1cc4cb[_0x2bd6bc(0x1e3)])[_0x2bd6bc(0x203)](0x2);(_0x498c97===0x1||_0x498c97===0x2||_0x498c97===0x3)&&(_0x38fa23='🎁'+_0x38fa23),updateElement('user-'+_0x498c97,_0x1cc4cb[_0x2bd6bc(0x1ee)]),updateElement('wagered-'+_0x498c97,'$'+_0x1cc4cb[_0x2bd6bc(0x21e)]['toFixed'](0x2)),updateElement(_0x2bd6bc(0x204)+_0x498c97,_0x38fa23,![]);});}function populateLeaderboard(_0x25107a){const _0x14c4d9=_0x4bf034,_0x4b004a=document['getElementById'](_0x14c4d9(0x213));_0x4b004a[_0x14c4d9(0x208)]='',_0x25107a[_0x14c4d9(0x1f4)](0x3,0x14)['forEach'](_0x31acad=>{const _0xe47a52=_0x14c4d9,_0x5b19db=document[_0xe47a52(0x1fc)]('tr');_0x5b19db[_0xe47a52(0x208)]=_0xe47a52(0x207)+_0x31acad[_0xe47a52(0x1e3)]+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>'+_0x31acad[_0xe47a52(0x1ee)]+_0xe47a52(0x1fe)+_0x31acad[_0xe47a52(0x21e)][_0xe47a52(0x203)](0x2)+_0xe47a52(0x1fe)+getPrize(_0x31acad[_0xe47a52(0x21e)],_0x31acad[_0xe47a52(0x1e3)])[_0xe47a52(0x203)](0x2)+_0xe47a52(0x1e6),_0x5b19db[_0xe47a52(0x212)][_0xe47a52(0x1ea)](_0xe47a52(0x1f7)),_0x4b004a[_0xe47a52(0x1e4)](_0x5b19db);});const _0xf1c5ed=_0x25107a[_0x14c4d9(0x20f)]((_0x53af29,_0x40f270)=>_0x53af29+_0x40f270[_0x14c4d9(0x21e)],0x0),_0x13ecdf=new Date(_0x25107a[0x0]['start_date_utc'])[_0x14c4d9(0x21d)](),_0x17da12=new Date(_0x25107a[0x0][_0x14c4d9(0x1f3)])[_0x14c4d9(0x21d)]();updateElement(_0x14c4d9(0x1f1),_0x13ecdf+'\x20to\x20'+_0x17da12),updateElement(_0x14c4d9(0x211),'$'+_0xf1c5ed[_0x14c4d9(0x203)](0x2));}function getPrize(_0x1e1f41,_0x238710){const _0x33cccc=_0x1e1f41>=0x124f8?prizesOver75k:prizesUnder75k;return _0x33cccc[_0x238710]||0x0;}function updateElement(_0x12ac97,_0x103333,_0x2109c2=!![]){const _0x351a8c=_0x4bf034,_0x2afa5f=document[_0x351a8c(0x1e5)](_0x12ac97);_0x2afa5f&&(_0x2109c2&&(_0x2afa5f[_0x351a8c(0x1e9)][_0x351a8c(0x209)]=_0x351a8c(0x1eb),_0x2afa5f[_0x351a8c(0x218)],_0x2afa5f['style'][_0x351a8c(0x209)]=_0x351a8c(0x1ed)),_0x2afa5f['textContent']=_0x103333);}setInterval(updateLeaderboard,0xc*0x3c*0x3c*0x3e8),updateLeaderboard();function _0x10d1(){const _0x2f6545=['265945PEPPxd','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','innerHTML','animation','4502200YNFrCo','Time\x20Left:','Leaderboard\x20End\x20Date:','sort','split','reduce','2238309cxzIUi','total-wager','classList','leaderboard-body','Parsed\x20CSV\x20Data:','countdown','1604MwDOSq','1147906tGbLVQ','offsetHeight','s</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Error\x20fetching\x20CSV\x20data:','2024-12-29T00:00:00Z','https://app.trevor.io/share/view/dad4e1e7-7df4-41f5-9ff8-c888fcdc113a/1d/pennygambl3r_Affiliate_Stake_com_Wager_Race_Statistics_.csv?seed=89','toLocaleDateString','wagered','CSV\x20Rows:','log','Error\x20updating\x20leaderboard:','Failed\x20to\x20fetch\x20CSV\x20data:','rank','appendChild','getElementById','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setDate','1379376wBBwGD','style','add','none','text','glitch\x200.3s\x20ease','user_name','length','Current\x20Time:','week-info','1lPsUkR','end_date_utc','slice','error','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22label\x22>Leaderboard\x20has\x20ended.\x20New\x20period\x20starts\x20in:</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','fade-in','2778KJzpEU','filter','floor','CSV\x20Data\x20fetched:','createElement','statusText','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>$','5529202oZlsVM','forEach','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22label\x22>Leaderboard\x20ends\x20in:</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>','getDate','toFixed','reward-','Fetching\x20CSV\x20data\x20from\x20URL...'];_0x10d1=function(){return _0x2f6545;};return _0x10d1();}function _0x18a3(_0x4f88fc,_0x42b625){const _0x10d1e8=_0x10d1();return _0x18a3=function(_0x18a369,_0x3a3e48){_0x18a369=_0x18a369-0x1e2;let _0x52a01f=_0x10d1e8[_0x18a369];return _0x52a01f;},_0x18a3(_0x4f88fc,_0x42b625);}const countdownInterval=setInterval(updateCountdown,0x3e8);
