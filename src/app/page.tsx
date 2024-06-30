'use client'

import { ConnectButton, lightTheme, useActiveWalletConnectionStatus, useReadContract } from "thirdweb/react";
import { client } from "./client";
import { lineaSepolia } from "./chains";
import "./page.css";
import Header from "./page_header/header";
import { Dispatch, SetStateAction, useState } from "react";
import { MailPop } from "./page_pop/mail_pop";
import { Body } from "./page_body/body";
import { InfoPop } from "./page_pop/info_pop";
import { BuyPop } from "./page_pop/buy_pop";
import { ChangePop } from "./page_pop/change_pop";
import { SellPop } from "./page_pop/sell_pop";
import { refreshTravelCards } from "./travel_card";


export default function Home() {
  const walletConnectionStatus = (useActiveWalletConnectionStatus() == "disconnected") ? true : false;

  const [mail_click, setMailClick] = useState(false);
  const [itemInfo, setItemInfo] = useState({click: false, info: {}});
  const [itemBuy, setItemBuy] = useState({click: false, info: {}});
  const [itemChange, setItemChange] = useState({click: false, info: {}});
  const [itemSell, setItemSell] = useState({click: false, info: {}});

    return (
      <main className="page_main_body">
        <PageMain mail_click={mail_click} setMailClick={setMailClick} setItemInfo={setItemInfo} setItemBuy={setItemBuy} setItemChange={setItemChange} setItemSell={setItemSell}/>
        {
          (walletConnectionStatus) ? (
            <div className="page_mask page_connect_buntton">
                <div className="flex justify-center mb-20">
                  <ConnectButton
                    client={client}
                    chain={lineaSepolia}
                    theme={lightTheme({
                      colors: {
                        primaryButtonBg: "#fdfcfd",
                        primaryButtonText: "#1a1523",
                        modalOverlayBg: "rgba(0, 0, 0, 0)"
                      },
                    })}
                  />
              </div>
            </div>
          ) : (
            <div></div>
          )
        }
        {
          mail_click ? (
            <MailPop mail_click={mail_click} setMailClick={setMailClick}/>
          ): (
            <div></div>
          )
        }
        {
          itemInfo.click ? (
            <InfoPop itemInfo={itemInfo.info} setItemInfo={setItemInfo}/>
          ): (
            <div></div>
          )
        }
        {
          itemBuy.click ? (
            <BuyPop itemInfo={itemBuy.info} setItemInfo={setItemBuy}/>
          ): (
            <div></div>
          )
        }
        {
          itemChange.click ? (
            <ChangePop itemInfo={itemChange.info} setItemInfo={setItemChange}/>
          ): (
            <div></div>
          )
        }
        {
          itemSell.click ? (
            <SellPop itemInfo={itemSell.info} setItemInfo={setItemSell}/>
          ): (
            <div></div>
          )
        }
      </main>
    );
  
}

function PageMain(props: {
  mail_click: boolean;
  setMailClick: Dispatch<SetStateAction<boolean>>;
  setItemInfo: Dispatch<SetStateAction<any>>,
  setItemBuy: Dispatch<SetStateAction<any>>,
  setItemChange: Dispatch<SetStateAction<any>>,
  setItemSell: Dispatch<SetStateAction<any>>,
}) {
  const [sign_click, setSignClick] = useState(false);

  // const { data, isLoading } = useReadContract({ 
  //   contract, 
  //   method: "function searchTravelCards() view returns ((bytes cardlKey, string country, string province, string city, string classify, string name, string description)[])", 
  //   params: [] 
  // });
  // console.log(data, isLoading);
  // if (!isLoading) {
  //   setTravelCards(data);
  // }
  refreshTravelCards();

  return (
    <div className="page_content">
      <div className="page_head">
        <Header mail_click={props.mail_click} sign_click={sign_click} setMailClick={props.setMailClick} setSignClick={setSignClick}/>
      </div>
      <div className="page_body">
        <Body setItemInfo={props.setItemInfo} setItemBuy={props.setItemBuy} setItemChange={props.setItemChange} setItemSell={props.setItemSell}/>
      </div>
    </div>
      
  );
  
}
