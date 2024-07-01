import { contract } from './client';
import { prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { WALLET_ADDRESS, ACCOUNT } from './page_header/header';

export class TravelCard {
    cardlKey!: `0x${string}`;
    country!: string;
    province!: string;
    city!: string;
    classify!: string;
    name!: string;
    description!: string;
}

export class TravelCardToken {
    travelCard!: TravelCard;
    cardTokenId!: bigint;
}

export let travelCards: readonly TravelCard[] | undefined = [];
export let ownerTravelCards: readonly TravelCardToken[] | undefined = [];
export let addressTravelCards: readonly TravelCardToken[] | undefined = [];


export async function refreshTravelCards() {
    const data = await readContract({ 
        contract, 
        method: "function searchTravelCards() view returns ((bytes cardlKey, string country, string province, string city, string classify, string name, string description)[])", 
        params: [] 
    });
    setTravelCards(data);
}
export function setTravelCards(data: readonly TravelCard[] | undefined) {
    travelCards = data;
}

export function getTravelCardsByStore(_search?: string) {
    const _travelCards: readonly TravelCard[] = (typeof travelCards == 'undefined' ? [] : travelCards);
    const showData: any[] = [];
    for (let index = 0; index < _travelCards.length; index++) {
        const card = _travelCards[index];
        if ((!!_search && (
            card.country.includes(_search) ||
            card.province.includes(_search) ||
            card.city.includes(_search) ||
            card.name.includes(_search))) || 
            (!_search)) {
                showData.push({...card, price: '0.001 ETH'});
        }
    }
    return showData;
}

export function getTravelCardBySell() {
    return [];
}

// 获取用户拥有的卡片
export async function refreshTravelCardByOwner(_address?: any) {
    if (!!_address) {
        const data = await readContract({ 
            contract, 
            method: "function searchTravelCardsByOwner(address _owner) view returns (((bytes cardlKey, string country, string province, string city, string classify, string name, string description) travelCard, uint256 cardTokenId)[])", 
            params: [_address] 
        });
        setTravelCardByAddress(data);
    } else if (!!WALLET_ADDRESS) {
        const data = await readContract({ 
            contract, 
            method: "function searchTravelCardsByOwner(address _owner) view returns (((bytes cardlKey, string country, string province, string city, string classify, string name, string description) travelCard, uint256 cardTokenId)[])", 
            params: [WALLET_ADDRESS] 
        });
        setTravelCardByOwner(data);
    }
}
export function setTravelCardByOwner(_data: readonly TravelCardToken[] | undefined) {
    ownerTravelCards = _data;
}
export function setTravelCardByAddress(_data: readonly TravelCardToken[] | undefined) {
    addressTravelCards = _data;
}
export function getTravelCardByOwner(_search?: string) {
    const resShowData: any[] = [];
    const mappingData: any = {};
    const travelCardTokens = (typeof ownerTravelCards == 'undefined' ? [] : ownerTravelCards);
    for (let index = 0; index < travelCardTokens.length; index++) {
        const card = travelCardTokens[index];
        if (!mappingData[card.travelCard.cardlKey]) {
            mappingData[card.travelCard.cardlKey] = {
                ...card.travelCard,
                count: 0,
                cardTokenIds: []
            }
        }
        mappingData[card.travelCard.cardlKey].count += 1;
        mappingData[card.travelCard.cardlKey].cardTokenIds.push(card.cardTokenId);
    }

    for (const key in mappingData) {
        if (Object.prototype.hasOwnProperty.call(mappingData, key)) {
            const card = mappingData[key];
            if ((!!_search && (
                card.country.includes(_search) ||
                card.province.includes(_search) ||
                card.city.includes(_search) ||
                card.name.includes(_search))) || 
                (!_search)) {
                    resShowData.push(card);
            }
            
        }
    }

    return resShowData;
}

export async function getLoginStatus() {
    if (!!WALLET_ADDRESS) {
        const data = await readContract({ 
            contract, 
            method: "function ownerLogin(address) view returns (uint256)", 
            params: [WALLET_ADDRESS] 
        });
        const timestamp = Date.now();
        console.log(data, timestamp);
        return data > timestamp ? true : false;
    } else {
        return false;
    }
}

// 点击签到
export async function getTravelCardByLogin() {
    if (!!WALLET_ADDRESS) {
        const cards = getCard();
        const account = ACCOUNT;
        const transaction = await prepareContractCall({ 
            contract, 
            method: "function getTravelCardByLogin(address _owner, (bytes cardlKey, string country, string province, string city, string classify, string name, string description) _scenicSpotCard, (bytes cardlKey, string country, string province, string city, string classify, string name, string description) _otherCard) returns (uint256[2] cardTokens)", 
            params: [WALLET_ADDRESS, cards.scenicSpot, cards.other] 
        });
        const { transactionHash } = await sendTransaction({ 
            transaction, 
            account
        });
    }
    
}

function getCard() {
    // travelCards
    const _travelCards = (typeof travelCards == 'undefined' ? [] : travelCards);

    const scenicSpotCards = [];
    const otherCards = [];
    for (let index = 0; index < _travelCards.length; index++) {
        const _card = _travelCards[index];
        if (_card.classify == 'ScenicSpot') {
            scenicSpotCards.push(_card);
        } else {
            otherCards.push(_card);
        }
    }
    return {
        scenicSpot: scenicSpotCards[Math.floor(Math.random() * scenicSpotCards.length)],
        other: otherCards[Math.floor(Math.random() * otherCards.length)],
    }
}