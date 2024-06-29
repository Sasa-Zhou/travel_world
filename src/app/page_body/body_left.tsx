import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import SearchSrc from "/public/image/search.png";
import InfoSrc from "/public/image/info.png";

import "./body.css";
import { ClassifyEnum } from "../page";
import { getTravelCardBySell, getTravelCardsByStore, travelCards } from "../travel_card";

export function BodyLeft(props: {
    tipChose: string,
    setItemInfo: Dispatch<SetStateAction<any>>,
    setItemBuy: Dispatch<SetStateAction<any>>,
}) {
    const [left_search, setLeftSearch] = useState('');
    const [items, setItemStores] = useState<any>({store: [], other: []});
    
    useEffect(() => {
        setItemStores({
            store: getTravelCardsByStore(left_search),
            other: getTravelCardBySell()
        });
    }, [travelCards, left_search]);
    const left_items: any[] = items[props.tipChose];
    const left_items_length = left_items.length;

    function searchChange(e: any) {
        setLeftSearch(e.target.value);
    }

    function getItemInfo(item: any, e: any) {
        props.setItemInfo({
            click: true,
            info: item
        });
    }
    function buyItem(item: any, e: any) {
        props.setItemBuy({
            click: true,
            info: item
        })
    }
    return (
        <div className="body_content">
            <div className="body_search">
                <input type="text" className="body_search_input" value={left_search} onChange={searchChange}/>
                <Image 
                    src={SearchSrc}
                    alt=""
                    className="body_search_image"
                />
            </div>
            <div className="body_items">
                { 
                    (left_items_length > 0) ? (

                        left_items.map((item, index: number) => (
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
                                <div className="body_item_area font_size_10">
                                    <span>价格：</span>
                                    <span>{item.price}</span>
                                </div>
                                <button className="left_item_button" onClick={(event) => buyItem(item, event)}>购买</button>
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

export function ImageLoader(props:{
    classify: string
}) {
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        // 假设这是一个异步获取图片地址的函数
        const fetchImageUrl = async () => {
          const response = await import('/public/image/' + props.classify + '.png');
          setImageSrc(response);
        };
        fetchImageUrl();
    }, []);
    return (
        <Image 
            src={imageSrc}
            alt=""
            className="body_item_image"
        />
        
    )
}