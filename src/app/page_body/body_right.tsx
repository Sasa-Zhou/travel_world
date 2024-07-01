import Image from "next/image";
import SearchSrc from "/public/image/search.png";
import InfoSrc from "/public/image/info.png";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./body.css";
import { ImageLoader } from "./body_left";
import { WALLET_ADDRESS } from "../page_header/header";
import { getTravelCardByOwner, ownerTravelCards, refreshTravelCardByOwner } from "../travel_card";

export function BodyRight(props: {
    setItemInfo: Dispatch<SetStateAction<any>>,
    setItemChange: Dispatch<SetStateAction<any>>,
    setItemSell: Dispatch<SetStateAction<any>>,
}) {
    const [right_search, setRightSearch] = useState('');
    const [items, setItems] = useState<any>([]);

    const items_length = items.length;

    // useEffect(() => {
    if(!!WALLET_ADDRESS) {
        refreshTravelCardByOwner();
    }
        
    // }, [WALLET_ADDRESS]);
    

    useEffect(() => {
        setItems(getTravelCardByOwner(right_search));
    }, [ownerTravelCards, right_search]);


    function searchChange(e: any) {
        setRightSearch(e.target.value);
    }

    function getItemInfo(item: any, e: any) {
        props.setItemInfo({
            click: true,
            info: item
        });
    }
    function changeItem(item: any, e: any) {
        props.setItemChange({
            click: true,
            info: item
        })
    }
    function sellItem(item: any, e: any) {
        props.setItemSell({
            click: true,
            info: item
        })
    }
    return (
        <div className="body_content">
            <div className="body_search">
                <input type="text" className="body_search_input" value={right_search} onChange={searchChange}/>
                <Image 
                    src={SearchSrc}
                    alt=""
                    className="body_search_image"
                />
            </div>
            <div className="body_items">
                {
                    (items_length > 0) ? (
                        items.map((item: any, index: number) => (
                            <div key={index} className="body_item">
                                <ImageLoader classify={item.classify}/>
                                <div className="body_item_title">
                                    <span>{item.name}</span>
                                    <Image 
                                        src={InfoSrc}
                                        alt=""
                                        className="body_item_info"
                                        onClick={(event) => getItemInfo(item, event)}
                                    />
                                </div>
                                <div className="body_item_area">
                                    <span>地区：</span>
                                    <span>{item.country}</span>
                                </div>
                                <div className="body_item_area">
                                    <span>{item.province}</span>
                                    <span>{item.city}</span>
                                </div>
                                <div className="body_item_area">
                                    <span>数量：</span>
                                    <span>{item.count}</span>
                                </div>
                                <div className="right_item_button">
                                    <button onClick={(event) => changeItem(item, event)}>交换</button>
                                    <button onClick={(event) => sellItem(item, event)}>出售</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="body_item_null">
                            <span>暂无商品</span>
                        </div>
                    )
                    
                }
            </div>
        </div>
    );
}