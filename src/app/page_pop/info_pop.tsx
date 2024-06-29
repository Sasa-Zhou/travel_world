import { Dispatch, SetStateAction } from "react";
import "./pop.css";
import Image from "next/image";

import CloseScr from "/public/image/close.png";

export function InfoPop(props: {
    itemInfo: any,
    setItemInfo: Dispatch<SetStateAction<any>>;
}) {

    function closeInfo() {
        props.setItemInfo({
            click: false,
            info: props.itemInfo
        });
    }
    return (
        <div className="page_mask">
            <div className="pop_click"  onClick={closeInfo}></div>
            <div className="pop_body info_pop_position">
                <div className="pop_main info_pop">
                    <div className="pop_title">
                        <div></div>
                        <span>{props.itemInfo.name}</span>
                        <Image
                            src={CloseScr}
                            alt=""
                            className="pop_title_img"
                            onClick={closeInfo}
                        ></Image>
                    </div>
                    <div className="pop_content info_pop_content">
                        <div>
                            <p>{props.itemInfo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}