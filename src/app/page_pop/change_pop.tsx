import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./pop.css";
import Image from "next/image";
import CloseScr from "/public/image/close.png";
import PlusScr from "/public/image/plus.png";
import ChangeSrc from "/public/image/change.png";
import { ImageLoader } from "../page_body/body_left";
import { addressTravelCards, getTravelCardByOwner, refreshTravelCardByOwner } from "../travel_card";

export function ChangePop(props: {
    itemInfo: any,
    setItemInfo: Dispatch<SetStateAction<any>>;
}) {
    const [change_account, setChangeAccount] = useState('');
    const [select_info, setSelectInfo] = useState<any>({click: false, hasInfo: false, info: {}});
    const [chose_items, setItems] = useState<any>([]);

    const chose_items_length = chose_items.length;


    useEffect(() => {
        setItems(getTravelCardByOwner());
    }, [change_account, addressTravelCards]);


    function sellPriceChange(e: any) {
        setChangeAccount(e.target.value);
    }

    function plusClick() {
        refreshTravelCardByOwner(change_account);
        setSelectInfo({click: true, hasInfo: select_info.hasInfo, info: select_info.info});
    }
    function closeChose() {
        setSelectInfo({click: false, hasInfo: select_info.hasInfo, info: select_info.info});
    }
    function choseItem(item: any, e:any) {
        setSelectInfo({click: false, hasInfo: true, info: item});
    }

    function closeInfo() {
        if (!select_info.click) {
            props.setItemInfo({
                click: false,
                info: props.itemInfo
            });

            setSelectInfo({click: false, hasInfo: false, info: {}});
        }
    }
    function changeIt() {
        props.setItemInfo({
            click: false,
            info: props.itemInfo
        });
    }
    return (
        <div className="page_mask">
            <div className="pop_click"></div>
            <div className="pop_body change_pop_position">
                <div className="pop_main change_pop">
                    <div className="pop_title">
                        <div></div>
                        <span>交换信息</span>
                        <div></div>
                    </div>
                    <div className="pop_content buy_pop_content">
                        <div className="change_pop_account">
                            <span>对方账户地址</span>
                            <input type="text" value={change_account} onChange={sellPriceChange}/>
                        </div>
                        <div className="change_pop_info">
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
                                </div>
                            </div>
                            <div className="change_pop_img">
                                <Image
                                    src={ChangeSrc}
                                    alt=""
                                    className="pop_title_img"
                                    onClick={closeInfo}
                                ></Image>
                            </div>
                            {
                                (select_info.hasInfo) ? (
                                    <div className="buy_pop_info" onClick={plusClick}>
                                        <ImageLoader classify={select_info.info.classify}/>
                                        <div>
                                            <div className="buy_pop_title">
                                                <span>{select_info.info.title}</span>
                                            </div>
                                            <div className="buy_pop_area">
                                                <span>地区：</span>
                                                <span>{select_info.info.country}</span>
                                            </div>
                                            <div className="buy_pop_area">
                                                <span>{select_info.info.province}</span>
                                                <span>{select_info.info.city}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="change_pop_right">
                                        <div>
                                            <Image
                                                src={PlusScr}
                                                alt=""
                                                className="pop_title_img"
                                                onClick={plusClick}
                                            ></Image>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                        <div className="buy_pop_button">
                            <button onClick={closeInfo}>取消</button>
                            <button onClick={changeIt}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                (select_info.click) ? (
                    <div className="pop_body mail_pop_position">
                        <div className="pop_main mail_pop">
                            <div className="pop_title">
                                <div></div>
                                <span>选择交换商品</span>
                                <Image
                                    src={CloseScr}
                                    alt=""
                                    className="pop_title_img"
                                    onClick={closeChose}
                                ></Image>
                            </div>
                            <div className="pop_content change_pop_chose_content">
                                <div>
                                    {
                                        (chose_items_length > 0) ? (

                                            chose_items.map((item: any, index: number) => (
                                                <div key={index} className="change_pop_chose_item">
                                                    <ImageLoader classify={item.classify}/>
                                                    <div className="change_pop_chose_item_title">
                                                        <span>{item.title}</span>
                                                        <div></div>
                                                    </div>
                                                    <div className="change_pop_chose_item_area">
                                                        <span>地区：</span>
                                                        <span>{item.country}</span>
                                                    </div>
                                                    <div className="change_pop_chose_item_area">
                                                        <span>{item.province}</span>
                                                        <span>{item.city}</span>
                                                    </div>
                                                    <button className="left_item_button" onClick={(event) => choseItem(item, event)}>选择</button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="change_pop_chose_item_null">
                                                <span>暂无商品</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )
            }
            
        </div>
    );
}