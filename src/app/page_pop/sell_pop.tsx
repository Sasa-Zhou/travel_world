import { Dispatch, SetStateAction, useState } from "react";
import "./pop.css";
import Image from "next/image";

import CloseScr from "/public/image/close.png";
import { ImageLoader } from "../page_body/body_left";

export function SellPop(props: {
    itemInfo: any,
    setItemInfo: Dispatch<SetStateAction<any>>;
}) {
    const [sell_price, setSellPrice] = useState('');


    function sellPriceChange(e: any) {
        setSellPrice(e.target.value);
    }

    function closeInfo() {
        props.setItemInfo({
            click: false,
            info: props.itemInfo
        });
    }

    function SellIt() {
        props.setItemInfo({
            click: false,
            info: props.itemInfo
        });
    }
    return (
        <div className="page_mask">
            <div className="pop_click" ></div>
            <div className="pop_body buy_pop_position">
                <div className="pop_main buy_pop">
                    <div className="pop_title">
                        <div></div>
                        <span>卖出确认</span>
                        <div></div>
                    </div>
                    <div className="pop_content buy_pop_content">
                        <div className="buy_pop_info">
                            <ImageLoader classify={props.itemInfo.classify}/>
                            <div>
                                <div className="buy_pop_title">
                                    <span>{props.itemInfo.title}</span>
                                </div>
                                <div className="buy_pop_area">
                                    <span>地区：</span>
                                    <span>{props.itemInfo.country}</span>
                                </div>
                                <div className="buy_pop_area">
                                    <span>{props.itemInfo.province}</span>
                                    <span>{props.itemInfo.city}</span>
                                </div>
                                <div className="buy_pop_area">
                                    <span>价格：</span>
                                    <div>
                                        <input type="text" value={sell_price} onChange={sellPriceChange}/>
                                        <span>ETH</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buy_pop_button">
                            <button onClick={closeInfo}>取消</button>
                            <button onClick={SellIt}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}