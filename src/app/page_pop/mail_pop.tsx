import { Dispatch, SetStateAction, useState } from "react";
import "./pop.css";
import Image from "next/image";

import CloseScr from "/public/image/close.png";

export function MailPop(props: {
    mail_click: boolean;
    setMailClick: Dispatch<SetStateAction<boolean>>;
}) {
    enum MailClassifyEnum{
        SellSuccess, // 卖出成功
        SellFail, // 卖出失败
        ExchangeApply, // 交换申请
        ExchangeSuccess, // 交换成功
        ExchangeFail, //交换失败
    };
    const classfiy_mapping: { [key: string]: any } = {
        "SellSuccess": "商品已卖出",
        "SellFail": "商品被撤摊",
        "ExchangeApply": "交换申请",
        "ExchangeSuccess": "交换成功",
        "ExchangeFail": "交换失败",
    }

    const mail_items = Array.from({length: 10}, ((_item, index) => {
        const classify = MailClassifyEnum[index % 5];
        return {
            title: classfiy_mapping[classify],
            classify: classify,
            datetime: "2024.6." + (1 + index) + "  10:30",
            content: "您委托寄售的商品（xxx）已被卖出，请查收。"
        }
    }));
    const [mail_item, setMailItem] = useState(mail_items[0]);
    const [mail_item_click, setMailItemClick] = useState(0);


    function maskClick() {
        props.setMailClick(false);
        setMailItemClick(0);
        setMailItem(mail_items[0]);
    }
    function mailItemClick(index: number, event: any) {
        setMailItemClick(index);
        setMailItem(mail_items[index]);
    };
    return (
        <div className="page_mask">
            <div className="pop_click"  onClick={maskClick}></div>
            <div className="pop_body mail_pop_position">
                <div className="pop_main mail_pop">
                    <div className="pop_title">
                        <div></div>
                        <span>信件</span>
                        <Image
                            src={CloseScr}
                            alt=""
                            className="pop_title_img"
                            onClick={maskClick}
                        ></Image>
                    </div>
                    <div className="pop_content mail_pop_content">
                        <div className="mail_pop_left">
                            <div className="mail_pop_left_body">
                                {
                                    mail_items.map((item, index: number) => (
                                        <div key={index} className={"mail_pop_item " + (mail_item_click == index ? "mail_pop_item_click" : "")} onClick={(event) => mailItemClick(index, event)}>
                                            <div className="mail_pop_item_up">
                                                <span className="mail_pop_item_title">{item.title}</span>
                                                <span className="mail_pop_item_time">{item.datetime}</span>
                                            </div>
                                            <div className="mail_pop_item_down">
                                                <span>{item.content}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mail_pop_right">
                            <div className="mail_pop_content_title">
                                <span>{mail_item.title}</span>
                            </div>
                            <div className="mail_pop_content_datetime">
                                <span>{mail_item.datetime}</span>
                            </div>
                            <div className="mail_pop_content_body">
                                <div className="mail_pop_content_text">
                                    <span>{mail_item.content}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}