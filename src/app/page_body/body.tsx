import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import { BodyMap } from "./body_map";
import LeftCloseScr from '/public/image/left_close.png';
import LeftOpenScr from '/public/image/left_open.png';
import RightCloseScr from '/public/image/right_close.png';
import RightOpenScr from '/public/image/right_open.png';
import "./body.css";
import { BodyLeft } from "./body_left";
import { BodyRight } from "./body_right";

export function Body(props: {
    setItemInfo: Dispatch<SetStateAction<any>>,
    setItemBuy: Dispatch<SetStateAction<any>>,
    setItemChange: Dispatch<SetStateAction<any>>,
    setItemSell: Dispatch<SetStateAction<any>>,
}) {
    const [left_hidden, setLeftHidden] = useState(false);
    const [left_menu, setLeftMenu] = useState('store');
    const left_menu_map: any = {
        store: "商店",
        other: "其他",
    };

    const [right_hidden, setRightHidden] = useState(false);
    const [viewCity, setViewCity] = useState('');
    

    function leftHidden() {
        setLeftHidden(!left_hidden);
    }
    function rightHidden() {
        setRightHidden(!right_hidden);
    }
    function leftTipChose(item: string, event: any) {
        setLeftMenu(item);
    }
    return (
        <div className="body_div">
            <div className="body_map">
                <BodyMap viewCity={viewCity} setViewCity={setViewCity}/>
            </div>
            {
                (viewCity != "") ? (
                    <div className="body_top">
                        <span>{viewCity}</span>
                    </div>
                ) : (
                    <div></div>
                )
            }
            
            <div className="body_left" hidden={left_hidden}>
                <div className="left_body">
                    <div className="left_body_top">
                        <Image
                            src={LeftOpenScr}
                            alt=""
                            className="body_left_reduce_image"
                            onClick={leftHidden}
                        />
                        <span>{left_menu_map[left_menu]}</span>
                        <div></div>
                    </div>
                    <div className="left_body_content">
                        <BodyLeft tipChose={left_menu} setItemInfo={props.setItemInfo} setItemBuy={props.setItemBuy}/>
                    </div>
                </div>
                <div className={("left_store " + (left_menu == 'store' ? "left_tip_chosed" : ""))} onClick={(event) => leftTipChose('store', event)}>
                    <span className="span_tr90">商</span>
                    <span className="span_tr90">店</span>
                </div>
                <div className={("left_other " + (left_menu == 'other' ? "left_tip_chosed" : ""))} onClick={(event) => leftTipChose('other', event)}>
                    <span className="span_tr90">其</span>
                    <span className="span_tr90">他</span>
                </div>
            </div>
            <div className="body_left_reduce" onClick={leftHidden}>
                <Image
                    src={LeftCloseScr}
                    alt=""
                    className="body_left_reduce_image"
                    onClick={leftHidden}
                />
            </div>
            <div className="body_right" hidden={right_hidden}>
                <div className="body_right_close" onClick={rightHidden}>
                    <Image
                        src={RightOpenScr}
                        alt=""
                        className="body_right_reduce_image"
                        onClick={rightHidden}
                    />
                </div>
                <div className="left_body">
                    <div className="right_body_top">
                        <span>我的</span>
                    </div>
                    <div className="right_body_content">
                        <BodyRight setItemInfo={props.setItemInfo} setItemChange={props.setItemChange} setItemSell={props.setItemSell}/>
                    </div>
                </div>
            </div>
            <div className="body_right_reduce" onClick={rightHidden}>
                <Image
                    src={RightCloseScr}
                    alt=""
                    className="body_right_reduce_image"
                    onClick={rightHidden}
                />
            </div>
        </div>
        
    );
}