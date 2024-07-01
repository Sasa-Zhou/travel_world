import Image, { StaticImageData } from "next/image";
import LogoSrc from "/public/image/logo.png";
import WalletLogoSrc from "/public/image/fox.svg";
import MailSrc from "/public/image/mail.png";
import FrogGoldSrc from "/public/image/frog_gold.png";
import FrogSilverSrc from "/public/image/frog_silver.png";
import FrogBronzeSrc from "/public/image/frog_bronze.png";

import "./header.css";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { truncateAddress } from "../utils";
import { getLoginStatus, getTravelCardByLogin } from "../travel_card";

// export const mail_click_status = false;
export let WALLET_ADDRESS: any = '';
export let ACCOUNT: any;

export default function Header(props: {
  mail_click: boolean;
  sign_click: boolean;
  setMailClick: Dispatch<SetStateAction<boolean>>;
  setSignClick: Dispatch<SetStateAction<boolean>>;
}) {
  const [sign_class, setSignClass] = useState('header_sign_in');
  const [sign_txt, setSignTxt] = useState('签到');
  const [achieve_gold, setAchieveGold] = useState('0');
  const [achieve_silver, setAchieveSilver] = useState('0');
  const [achieve_bronze, setAchieveBronze] = useState('0');

  // 获取钱包地址
  ACCOUNT = useActiveAccount();
  WALLET_ADDRESS = ACCOUNT?.address;


  // 更改收集数量
  // const gold = Number(achieve_gold) + 1;
  // setAchieveGold(gold.toString());

  let loginStatus = getLoginStatus();
  useEffect(() => {
    
    async function fetchData() {
      if (await loginStatus) {
        setSignClass("header_signed_in");
        setSignTxt("已签到");
      } else {
        setSignClass("header_sign_in");
        setSignTxt("签到");
      }
    }
    fetchData();

}, []);

  

  // onClick事件
  function signClick() {
    if (props.sign_click) {
      return;
    }
    getTravelCardByLogin();
    props.setSignClick(true);
  }

  function mailClick() {
    props.setMailClick(true);
  }
  
  return (
      <div className="header_body">
        <div className="header_left">
          <div className="header_logo">
            <Image
              src={LogoSrc}
              alt=""
              className="header_logo_img"
            />
            <span>旅行青蛙🐸</span>
          </div>
          <div className={"header_sign " + sign_class} 
            onClick={signClick}
          >
            <span onClick={signClick} >{sign_txt}</span>
          </div>
        </div>
        <div className="header_right">
          <div className="header_achievement">
            <HeaderAchievement src={FrogGoldSrc} text={achieve_gold} title="已完成收集的国家数量"/>
            <HeaderAchievement src={FrogSilverSrc} text={achieve_silver} title="已完成收集的省级数量"/>
            <HeaderAchievement src={FrogBronzeSrc} text={achieve_bronze} title="已完成收集的城市数量"/>
          </div>
          <div className="header_mail" onClick={mailClick}>
            <Image
              src={MailSrc}
              alt=""
              className="header_mail_image"
              onClick={mailClick}
            />
          </div>
          <div className="header_wallet">
            <Image
              src={WalletLogoSrc}
              alt=""
              className="header_wallet_logo"
            />
            <div className="header_wallet_info">
              <span>{truncateAddress(WALLET_ADDRESS!)}</span>
            </div>
          </div>
        </div>
      </div>
  );
}

function HeaderAchievement(props: {
  src: StaticImageData;
  text: string;
  title: string;
}) {
  
  return (
    <div className="header_achievement_item" title={props.title}>
      <Image
        src={props.src}
        alt=""
        className="header_achievement_image"
      />
      <span>{props.text}</span>
    </div>
  );
}