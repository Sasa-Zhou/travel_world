import { Dispatch, SetStateAction, useState } from "react";
import "./pop.css";
import Image from "next/image";
import CloseScr from "/public/image/close.png";
import PlusScr from "/public/image/plus.png";
import ChangeSrc from "/public/image/change.png";
import InfoSrc from "/public/image/info.png";
import { ImageLoader } from "../page_body/body_left";
import { ClassifyEnum } from "../page";

export function ChangePop(props: {
    itemInfo: any,
    setItemInfo: Dispatch<SetStateAction<any>>;
}) {
    const [change_account, setChangeAccount] = useState('');
    const [select_info, setSelectInfo] = useState<any>({click: false, hasInfo: false, info: {}});

    const chose_items = Array.from({length: 20}, ((_item, index) => {
        const classify = ClassifyEnum[index % 5];
        return {
            title: '样式' + index,
            classify: classify,
            country: "中国",
            province: "四川",
            city: "成都",
            content: "孔子（公元前551年9月28日—前479年4月11日），名丘，字仲尼，春秋时期鲁国陬邑（今山东省曲阜市）人，祖籍宋国栗邑（今河南省夏邑县）。父叔梁纥，母颜氏。中国古代思想家、政治家、教育家，儒家学派创始人。 [1-3] [53] [56]孔子三岁丧父，家道中落，早年做过管粮仓、管放牧的小官。他“少好礼”，自幼熟悉传统礼制，青年时便以广博的礼乐知识闻名于鲁，从事儒者之业，以办理丧祭之礼为生。中年聚徒讲学，从事教育活动。年五十，曾一度担任鲁国的司寇，摄行相职，积极推行自己的政治主张，不久因与当政者政见不合而弃官去鲁，偕弟子周游列国，宣传自己的政治主张和思想学说，终未见用。晚年回到鲁国，致力教育事业，整理《诗》《书》，删修《春秋》，以传述六艺为终身志业。 [53]孔子曾带领部分弟子周游列国十四年，修订六经。去世后，其弟子及再传弟子把孔子及其弟子的言行语录和思想记录下来，整理编成《论语》。该书被奉为儒家经典。 [1]孔子对后世影响深远长久。他的“仁”与“礼”成为国家施政和个人自我修养的重要准则；“有教无类”的平民教育思想使华夏文明得以无限传承；对古代文献的系统整理，不仅寄予了自己的理想，更使得中华民族的文化遗产具有了深广的内涵。"
        }
    }));
    const chose_items_length = chose_items.length;


    function sellPriceChange(e: any) {
        setChangeAccount(e.target.value);
    }

    function plusClick() {
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

                                            chose_items.map((item, index: number) => (
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